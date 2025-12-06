import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import AppSidebar from '../components/Layout/AppSidebar'
import PageModal from '../components/Page/PageModal'
import TemplateGallery from '../components/Template/TemplateGallery'
import SkeletonLoader from '../components/UI/SkeletonLoader'
import Toast, { useToast } from '../components/UI/Toast'
import { getWorkspace, getWorkspaces } from '../services/workspaceService'
import { getPages, createPage, updatePage, deletePage } from '../services/pageService'
import { GRID_TYPES } from '../utils/constants'
import { staggerContainer, fadeIn, cardVariants } from '../utils/animations'

export default function WorkspaceDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [workspaces, setWorkspaces] = useState([])
    const [workspace, setWorkspace] = useState(null)
    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [isPageModalOpen, setIsPageModalOpen] = useState(false)
    const [editingPage, setEditingPage] = useState(null)
    const [showTemplates, setShowTemplates] = useState(false)
    const { toasts, showToast } = useToast()

    const loadWorkspaceData = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                navigate('/login')
                return
            }

            setUser(session.user)

            const [workspaceData, pagesData, workspacesData] = await Promise.all([
                getWorkspace(id),
                getPages(id),
                getWorkspaces(session.user.id)
            ])

            setWorkspace(workspaceData)
            setPages(pagesData)
            setWorkspaces(workspacesData)
        } catch (error) {
            console.error('Error loading workspace:', error)
            navigate('/dashboard')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadWorkspaceData()
    }, [id, navigate])

    const handleCreatePage = () => {
        setEditingPage(null)
        setIsPageModalOpen(true)
    }

    const handleEditPage = (page) => {
        setEditingPage(page)
        setIsPageModalOpen(true)
    }

    const handleDeletePage = async (page) => {
        if (!confirm(`¿Estás seguro de eliminar "${page.title}" y todos sus bloques?`)) {
            return
        }

        try {
            await deletePage(page.id)
            setPages(pages.filter(p => p.id !== page.id))
            showToast('Página eliminada exitosamente', 'success')
        } catch (error) {
            showToast('Error al eliminar página', 'error')
        }
    }

    const handleSavePage = async (formData) => {
        try {
            if (editingPage) {
                // Update existing page
                const updated = await updatePage(editingPage.id, formData)
                setPages(pages.map(p => p.id === updated.id ? { ...updated, block_count: p.block_count } : p))
                showToast('Página actualizada exitosamente', 'success')
            } else {
                // Create new page
                const newPage = await createPage(id, formData)
                setPages([{ ...newPage, block_count: 0 }, ...pages])
                showToast('Página creada exitosamente', 'success')
            }
        } catch (error) {
            showToast('Error al guardar página', 'error')
            throw error
        }
    }

    const handleNavigateToPage = (pageId) => {
        navigate(`/workspace/${id}/page/${pageId}`)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getGridIcon = (gridType) => {
        const grid = GRID_TYPES.find(g => g.value === gridType)
        return grid ? grid.icon : '⬜'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <SkeletonLoader type="page" count={6} />
            </div>
        )
    }

    if (!workspace) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-red-400 text-xl">Workspace no encontrado</div>
            </div>
        )
    }

    return (
        <>
            <div className="flex min-h-screen" style={{ backgroundColor: '#ffffff' }}>
                <AppSidebar user={user} workspaces={workspaces} />

                <main className="flex-1 ml-48 overflow-auto" style={{ marginLeft: '12rem' }}>
                    <div className="p-4" style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
                        {/* Navigation - Top */}
                        <motion.div
                            className="mb-8"
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                        >
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="text-accent-cyan hover:text-accent-teal transition-colors flex items-center gap-2 font-medium"
                            >
                                ← Volver a Workspaces
                            </button>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Workspace Info */}
                            <motion.div
                                className="w-full lg:w-80 flex-shrink-0 space-y-8"
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                                        Descripción
                                    </h2>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-sm"
                                                style={{
                                                    background: `linear-gradient(135deg, ${workspace.color}40, ${workspace.color}80)`,
                                                    border: `2px solid ${workspace.color}60`
                                                }}
                                            >
                                                {workspace.icon}
                                            </div>
                                            <div>
                                                <h1 className="text-xl font-bold text-gray-900">
                                                    {workspace.name}
                                                </h1>
                                                <p className="text-xs text-gray-500">
                                                    Creado el {formatDate(workspace.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        {workspace.description ? (
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {workspace.description}
                                            </p>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">
                                                Sin descripción
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Members Section (Placeholder) */}
                                <div>
                                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Miembros
                                        </h2>
                                        <button className="text-sm text-accent-cyan hover:text-accent-teal font-medium">
                                            + Añadir
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-highlight flex items-center justify-center text-white text-xs font-bold">
                                                {user?.email?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user?.email?.split('@')[0] || 'Usuario'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Propietario
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column - Pages Grid */}
                            <div className="flex-1">
                                <motion.div
                                    className="flex items-center justify-between mb-6"
                                    variants={fadeIn}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Páginas
                                    </h2>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowTemplates(true)}
                                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-all flex items-center gap-2 text-sm"
                                        >
                                            <span className="text-lg">📋</span>
                                            Usar Plantilla
                                        </button>
                                        <button
                                            onClick={handleCreatePage}
                                            className="bg-accent-cyan hover:bg-accent-teal text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"
                                        >
                                            <span className="text-lg">➕</span>
                                            Nueva Página
                                        </button>
                                    </div>
                                </motion.div>

                                {pages.length === 0 ? (
                                    <motion.div
                                        className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200"
                                        variants={fadeIn}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <div className="text-5xl mb-4 opacity-50">📄</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            No hay páginas aún
                                        </h3>
                                        <p className="text-gray-500 mb-6 text-center max-w-xs">
                                            Comienza creando tu primera página para organizar tus notas.
                                        </p>
                                        <button
                                            onClick={handleCreatePage}
                                            className="text-accent-cyan hover:text-accent-teal font-semibold"
                                        >
                                            + Crear primera página
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3"
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {/* New Page Card */}
                                        <motion.div
                                            variants={cardVariants}
                                            onClick={handleCreatePage}
                                            className="group relative flex flex-col items-center justify-center aspect-square bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-accent-cyan cursor-pointer transition-all shadow-sm hover:shadow-md"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-50 shadow-inner group-hover:bg-accent-cyan/10 flex items-center justify-center text-lg text-gray-400 group-hover:text-accent-cyan transition-colors mb-1">
                                                +
                                            </div>
                                            <h3 className="text-[11px] font-bold text-gray-500 group-hover:text-accent-cyan transition-colors text-center px-1">
                                                Nueva
                                            </h3>
                                        </motion.div>

                                        {pages.map((page, index) => {
                                            const GRADIENTS = [
                                                { id: 'ocean', name: 'Ocean', class: 'from-blue-400 to-blue-600', style: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
                                                { id: 'royal', name: 'Royal', class: 'from-purple-400 to-purple-600', style: 'linear-gradient(135deg, #c084fc, #9333ea)' },
                                                { id: 'nature', name: 'Nature', class: 'from-green-400 to-green-600', style: 'linear-gradient(135deg, #4ade80, #16a34a)' },
                                                { id: 'sunset', name: 'Sunset', class: 'from-orange-400 to-orange-600', style: 'linear-gradient(135deg, #fb923c, #ea580c)' },
                                                { id: 'berry', name: 'Berry', class: 'from-pink-400 to-pink-600', style: 'linear-gradient(135deg, #f472b6, #db2777)' },
                                                { id: 'teal', name: 'Teal', class: 'from-teal-400 to-teal-600', style: 'linear-gradient(135deg, #2dd4bf, #0d9488)' },
                                                { id: 'indigo', name: 'Indigo', class: 'from-indigo-400 to-indigo-600', style: 'linear-gradient(135deg, #818cf8, #4f46e5)' },
                                                { id: 'fire', name: 'Fire', class: 'from-red-400 to-red-600', style: 'linear-gradient(135deg, #f87171, #dc2626)' },
                                            ];

                                            // Find gradient by ID or class (backward compatibility) or fallback
                                            const gradient = GRADIENTS.find(g => g.id === page.color) ||
                                                GRADIENTS.find(g => g.class === page.color) ||
                                                GRADIENTS[index % GRADIENTS.length];

                                            return (
                                                <motion.div
                                                    key={page.id}
                                                    variants={cardVariants}
                                                    onClick={() => handleNavigateToPage(page.id)}
                                                    className="group relative aspect-square rounded-xl p-2.5 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden text-white"
                                                    style={{ background: gradient.style }}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                >
                                                    {/* Header: Icon Top-Right */}
                                                    <div className="flex justify-between items-start">
                                                        <div className="w-full pr-4">
                                                            <h3 className="text-xs font-extrabold line-clamp-2 leading-tight tracking-tight text-white drop-shadow-sm">
                                                                {page.title}
                                                            </h3>
                                                        </div>
                                                        <div className="absolute top-2 right-2 text-base opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md">
                                                            {getGridIcon(page.grid_type)}
                                                        </div>
                                                    </div>

                                                    {/* Description/Stats */}
                                                    <div className="flex-1 mt-1 mb-1 overflow-hidden flex items-end">
                                                        <p className="text-[10px] opacity-90 font-medium text-white/90">
                                                            {page.block_count} {page.block_count === 1 ? 'bloque' : 'bloques'}
                                                        </p>
                                                    </div>

                                                    {/* Footer: Metadata */}
                                                    <div className="flex items-center justify-between text-[9px] font-bold opacity-80 uppercase tracking-wider border-t border-white/20 pt-1 mt-auto text-white/90">
                                                        <span>Activo</span>
                                                        <span>Hoy</span>
                                                    </div>

                                                    {/* Hover Actions */}
                                                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleEditPage(page)
                                                            }}
                                                            className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors shadow-sm backdrop-blur-sm"
                                                            title="Editar"
                                                        >
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleDeletePage(page)
                                                            }}
                                                            className="p-1 rounded-full bg-white/20 hover:bg-red-500/80 text-white transition-colors shadow-sm backdrop-blur-sm"
                                                            title="Eliminar"
                                                        >
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Page Modal */}
            <PageModal
                isOpen={isPageModalOpen}
                onClose={() => setIsPageModalOpen(false)}
                onSave={handleSavePage}
                workspaceId={id}
                page={editingPage}
            />

            {/* Template Gallery */}
            {showTemplates && (
                <TemplateGallery
                    workspaceId={id}
                    onTemplateUsed={(newPage) => {
                        loadWorkspaceData()
                        navigate(`/workspace/${id}/page/${newPage.id}`)
                    }}
                    onClose={() => setShowTemplates(false)}
                />
            )}

            {/* Toast Notifications */}
            <Toast toasts={toasts} />
        </>
    )
}
