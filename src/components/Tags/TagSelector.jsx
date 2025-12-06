import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    getTags,
    createTag,
    addTagToPage,
    removeTagFromPage,
    getPageTags,
    TAG_COLORS,
} from '../../services/tagService'
import { getCurrentUserId } from '../../services/storageService'
import { toastConfig } from '../UI/Toast'

export default function TagSelector({ pageId }) {
    const [allTags, setAllTags] = useState([])
    const [pageTags, setPageTags] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [newTagName, setNewTagName] = useState('')
    const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0])
    const dropdownRef = useRef(null)

    useEffect(() => {
        loadTags()
        loadPageTags()
    }, [pageId])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const loadTags = async () => {
        try {
            const userId = await getCurrentUserId()
            const tags = await getTags(userId)
            setAllTags(tags)
        } catch (error) {
            console.error('Error loading tags:', error)
        }
    }

    const loadPageTags = async () => {
        try {
            const tags = await getPageTags(pageId)
            setPageTags(tags)
        } catch (error) {
            console.error('Error loading page tags:', error)
        }
    }

    const handleCreateTag = async () => {
        if (!newTagName.trim()) return

        try {
            const userId = await getCurrentUserId()
            const newTag = await createTag({
                user_id: userId,
                name: newTagName.trim(),
                color: selectedColor,
            })

            setAllTags([...allTags, newTag])
            setNewTagName('')
            toastConfig.success('Tag creado')
        } catch (error) {
            toastConfig.error('Error al crear tag')
            console.error(error)
        }
    }

    const handleAddTag = async (tag) => {
        try {
            await addTagToPage(pageId, tag.id)
            setPageTags([...pageTags, tag])
            toastConfig.success('Tag agregado')
        } catch (error) {
            toastConfig.error('Error al agregar tag')
            console.error(error)
        }
    }

    const handleRemoveTag = async (tag) => {
        try {
            await removeTagFromPage(pageId, tag.id)
            setPageTags(pageTags.filter((t) => t.id !== tag.id))
            toastConfig.success('Tag eliminado')
        } catch (error) {
            toastConfig.error('Error al eliminar tag')
            console.error(error)
        }
    }

    const availableTags = allTags.filter((t) => !pageTags.some((pt) => pt.id === t.id))

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Tags actuales */}
            <div className="flex flex-wrap gap-2 items-center">
                <AnimatePresence>
                    {pageTags.map((tag) => (
                        <motion.div
                            key={tag.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{
                                backgroundColor: `${tag.color}20`,
                                color: tag.color,
                                border: `1px solid ${tag.color}40`,
                            }}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                            </svg>
                            <span>{tag.name}</span>
                            <motion.button
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:opacity-70 transition-opacity"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Botón agregar */}
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    title="Agregar tag"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                    >
                        {/* Input nuevo tag */}
                        <div className="p-3 border-b border-gray-200">
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newTagName}
                                        onChange={(e) => setNewTagName(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
                                        placeholder="Nuevo tag..."
                                        className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                                    />
                                    <button
                                        onClick={handleCreateTag}
                                        className="px-3 py-1.5 bg-accent-cyan rounded text-white text-sm font-medium hover:bg-accent-teal transition-colors"
                                    >
                                        Crear
                                    </button>
                                </div>

                                {/* Color picker */}
                                <div className="flex gap-1.5">
                                    {TAG_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lista de tags disponibles */}
                        <div className="max-h-48 overflow-y-auto p-2">
                            {availableTags.length > 0 ? (
                                availableTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        onClick={() => {
                                            handleAddTag(tag)
                                            setShowDropdown(false)
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-left hover:bg-gray-50 transition-colors"
                                        style={{ color: tag.color }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            />
                                        </svg>
                                        <span>{tag.name}</span>
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500 py-4">No hay tags disponibles</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
