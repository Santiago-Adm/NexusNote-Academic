import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { supabase } from '../lib/supabase'
import Sidebar from '../components/Layout/AppSidebar'
import GridBackground from '../components/Page/GridBackground'
import BlockContainer from '../components/Block/BlockContainer'
import TextBlock from '../components/Block/TextBlock'
import CodeBlock from '../components/Block/CodeBlock'
import TaskBlock from '../components/Block/TaskBlock'
import CanvasBlock from '../components/Block/CanvasBlock'
import ImageBlock from '../components/Block/ImageBlock'
import PDFBlock from '../components/Block/PDFBlock'
import TagSelector from '../components/Tags/TagSelector'
import Toast, { useToast } from '../components/UI/Toast'
import { getPage, updatePage } from '../services/pageService'
import { getBlocks, createBlock, updateBlock, deleteBlock, reorderBlocks } from '../services/blockService'
import { getWorkspaces } from '../services/workspaceService'
import { BLOCK_TYPES } from '../utils/constants'
import { slideDown, scaleIn, floatingAnimation, fadeIn } from '../utils/animations'

export default function PageEditor() {
    const { workspaceId, pageId } = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState(null)
    const [blocks, setBlocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showBlockMenu, setShowBlockMenu] = useState(false)
    const [editingTitle, setEditingTitle] = useState(false)
    const [titleValue, setTitleValue] = useState('')
    const [user, setUser] = useState(null)
    const [workspaces, setWorkspaces] = useState([])
    const { toasts, showToast } = useToast()

    // Drag and drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 8px movement required to start drag
            },
        })
    )

    useEffect(() => {
        loadPageData()
    }, [pageId])

    const loadPageData = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                navigate('/login')
                return
            }

            setUser(session.user)

            const [pageData, blocksData, workspacesData] = await Promise.all([
                getPage(pageId),
                getBlocks(pageId),
                getWorkspaces(session.user.id)
            ])

            setPage(pageData)
            setTitleValue(pageData.title)
            setBlocks(blocksData)
            setWorkspaces(workspacesData)
        } catch (error) {
            console.error('Error loading page:', error)
            showToast('Error al cargar la página', 'error')
            navigate(`/workspace/${workspaceId}`)
        } finally {
            setLoading(false)
        }
    }

    const handleTitleSave = async () => {
        if (!titleValue.trim() || titleValue === page.title) {
            setEditingTitle(false)
            setTitleValue(page.title)
            return
        }

        try {
            setSaving(true)
            const updated = await updatePage(pageId, { title: titleValue })
            setPage(updated)
            setEditingTitle(false)
            showToast('Título actualizado', 'success')
        } catch (error) {
            showToast('Error al actualizar título', 'error')
            setTitleValue(page.title)
        } finally {
            setSaving(false)
        }
    }

    const handleAddBlock = async (blockType) => {
        try {
            const newPosition = blocks.length
            const defaultContent = getDefaultContent(blockType)

            const newBlock = await createBlock(pageId, {
                type: blockType,
                content: defaultContent,
                position: newPosition,
            })

            setBlocks([...blocks, newBlock])
            setShowBlockMenu(false)
            showToast('Bloque agregado', 'success')
        } catch (error) {
            showToast('Error al agregar bloque', 'error')
        }
    }

    const handleUpdateBlock = useCallback(async (blockId, content) => {
        try {
            setSaving(true)
            await updateBlock(blockId, content)
            // Update local state
            setBlocks(blocks => blocks.map(b =>
                b.id === blockId ? { ...b, content } : b
            ))
        } catch (error) {
            console.error('Error updating block:', error)
            showToast('Error al guardar bloque', 'error')
        } finally {
            setSaving(false)
        }
    }, [showToast])

    const handleDeleteBlock = async (blockId) => {
        if (!confirm('¿Eliminar este bloque?')) return

        try {
            await deleteBlock(blockId)
            setBlocks(blocks.filter(b => b.id !== blockId))
            showToast('Bloque eliminado', 'success')
        } catch (error) {
            showToast('Error al eliminar bloque', 'error')
        }
    }

    const handleDuplicateBlock = async (block) => {
        try {
            const newPosition = blocks.length
            const newBlock = await createBlock(pageId, {
                type: block.type,
                content: block.content,
                position: newPosition,
            })

            setBlocks([...blocks, newBlock])
            showToast('Bloque duplicado', 'success')
        } catch (error) {
            showToast('Error al duplicar bloque', 'error')
        }
    }

    const handleDragEnd = async (event) => {
        const { active, over } = event

        if (!over || active.id === over.id) {
            return
        }

        const oldIndex = blocks.findIndex(b => b.id === active.id)
        const newIndex = blocks.findIndex(b => b.id === over.id)

        const newBlocks = arrayMove(blocks, oldIndex, newIndex)
        setBlocks(newBlocks)

        // Update positions in database
        try {
            const blockIds = newBlocks.map(b => b.id)
            await reorderBlocks(pageId, blockIds)
            showToast('Bloques reordenados', 'success')
        } catch (error) {
            console.error('Error reordering blocks:', error)
            showToast('Error al reordenar bloques', 'error')
            // Revert on error
            setBlocks(blocks)
        }
    }

    const getDefaultContent = (blockType) => {
        switch (blockType) {
            case 'text':
                return { text: '' }
            case 'code':
                return { code: '', language: 'javascript' }
            case 'task':
                return { tasks: [] }
            case 'canvas':
                return { dataURL: null, gridType: 'dots', width: 800, height: 600 }
            case 'image':
                return { url: null, path: null, caption: '' }
            case 'pdf':
                return { url: null, path: null, title: '' }
            default:
                return {}
        }
    }

    const renderBlockContent = (block) => {
        const handleChange = (content) => handleUpdateBlock(block.id, content)

        switch (block.type) {
            case 'text':
                return <TextBlock content={block.content} onChange={handleChange} />
            case 'code':
                return <CodeBlock content={block.content} onChange={handleChange} />
            case 'task':
                return <TaskBlock content={block.content} onChange={handleChange} />
            case 'canvas':
                return <CanvasBlock content={block.content} onChange={handleChange} />
            case 'image':
                return <ImageBlock content={block.content} onChange={handleChange} onDelete={() => handleDeleteBlock(block.id)} />
            case 'pdf':
                return <PDFBlock content={block.content} onChange={handleChange} onDelete={() => handleDeleteBlock(block.id)} />
            default:
                return <p className="text-gray-400 italic">Tipo de bloque desconocido</p>
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-accent-cyan text-xl">Cargando...</div>
            </div>
        )
    }

    if (!page) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-red-400 text-xl">Página no encontrada</div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar user={user} workspaces={workspaces} />

            {/* Grid Background */}
            <GridBackground gridType={page.grid_type} />

            <main className="flex-1 ml-48 relative" style={{ marginLeft: '12rem' }}>
                {/* Header */}
                <motion.div
                    className="sticky top-0 bg-white border-b border-gray-200 p-6 shadow-sm z-20"
                    variants={slideDown}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="max-w-5xl mx-auto">
                        <button
                            onClick={() => navigate(`/workspace/${workspaceId}`)}
                            className="text-accent-cyan hover:text-accent-teal transition-colors mb-4 flex items-center gap-2 font-medium"
                        >
                            ← Volver al Workspace
                        </button>

                        <div className="flex items-center justify-between">
                            {/* Editable Title */}
                            {editingTitle ? (
                                <input
                                    type="text"
                                    value={titleValue}
                                    onChange={(e) => setTitleValue(e.target.value)}
                                    onBlur={handleTitleSave}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleTitleSave()
                                        if (e.key === 'Escape') {
                                            setEditingTitle(false)
                                            setTitleValue(page.title)
                                        }
                                    }}
                                    autoFocus
                                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-accent-cyan focus:outline-none"
                                />
                            ) : (
                                <h1
                                    onClick={() => setEditingTitle(true)}
                                    className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-accent-cyan transition-colors"
                                >
                                    {page.title}
                                </h1>
                            )}

                            {/* Save Indicator */}
                            <div className="flex items-center gap-3">
                                {saving ? (
                                    <span className="text-accent-cyan text-sm flex items-center gap-2">
                                        <span className="animate-spin">☁️</span>
                                        Guardando...
                                    </span>
                                ) : (
                                    <span className="text-gray-500 text-sm flex items-center gap-2">
                                        <span>✓</span>
                                        Guardado
                                    </span>
                                )}
                                <span className="text-gray-400 text-sm">
                                    {blocks.length} {blocks.length === 1 ? 'bloque' : 'bloques'}
                                </span>
                            </div>

                            {/* Tag Selector */}
                            <div className="mt-4">
                                <TagSelector pageId={pageId} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Blocks Area */}
                <div className="max-w-5xl mx-auto p-6 space-y-4">
                    {blocks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="text-6xl mb-4">📝</div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Página vacía
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Agrega tu primer bloque para comenzar
                            </p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={blocks.map(b => b.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {blocks.map((block) => (
                                    <BlockContainer
                                        key={block.id}
                                        block={block}
                                        onUpdate={handleUpdateBlock}
                                        onDelete={handleDeleteBlock}
                                        onDuplicate={handleDuplicateBlock}
                                    >
                                        {renderBlockContent(block)}
                                    </BlockContainer>
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}

                    {/* Add Block Button */}
                    <motion.div className="relative">
                        <motion.button
                            onClick={() => setShowBlockMenu(!showBlockMenu)}
                            className="w-full bg-bg-secondary/30 border-2 border-dashed border-accent-cyan/30 hover:border-highlight/50 rounded-lg py-4 text-accent-cyan hover:text-highlight transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                            animate={floatingAnimation}
                            whileHover={{ scale: 1.02, borderColor: 'rgba(77, 184, 163, 0.5)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-xl">➕</span>
                            Agregar Bloque
                        </motion.button>

                        {/* Block Type Menu */}
                        <AnimatePresence>
                            {showBlockMenu && (
                                <motion.div
                                    className="absolute bottom-full left-0 right-0 mb-2 bg-bg-secondary border border-accent-blue/30 rounded-lg shadow-2xl shadow-accent-blue/20 overflow-hidden z-10"
                                    variants={scaleIn}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {BLOCK_TYPES.map((blockType) => (
                                        <button
                                            key={blockType.value}
                                            onClick={() => handleAddBlock(blockType.value)}
                                            className="w-full px-6 py-4 text-left hover:bg-highlight/20 transition-all duration-300 border-b border-accent-blue/20 last:border-b-0"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{blockType.icon}</span>
                                                <div>
                                                    <div className="text-white font-medium">{blockType.label}</div>
                                                    <div className="text-gray-400 text-sm">{blockType.description}</div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>

            {/* Toast Notifications */}
            <Toast toasts={toasts} />
        </div>
    )
}
