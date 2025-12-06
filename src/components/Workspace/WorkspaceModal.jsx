import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmojiPicker from './EmojiPicker'
import ColorPicker from './ColorPicker'
import { modalOverlay, modalContent, staggerFast } from '../../utils/animations'

export default function WorkspaceModal({ isOpen, onClose, onSave, workspace = null }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '📚',
        color: '#2d7a8e',
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (workspace) {
            setFormData({
                name: workspace.name,
                description: workspace.description || '',
                icon: workspace.icon,
                color: workspace.color,
            })
        } else {
            setFormData({
                name: '',
                description: '',
                icon: '📚',
                color: '#2d7a8e',
            })
        }
    }, [workspace, isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await onSave(formData)
            onClose()
        } catch (error) {
            console.error('Error saving workspace:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        variants={modalOverlay}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    >
                        {/* Modal Content */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 p-8"
                            variants={modalContent}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {workspace ? 'Editar Workspace' : 'Nuevo Workspace'}
                                </h2>
                                <motion.button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-highlight transition-colors duration-300 text-2xl"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ✕
                                </motion.button>
                            </div>

                            {/* Form */}
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                variants={staggerFast}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Name */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre del Workspace *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 outline-none transition-all"
                                        placeholder="Ej: Matemáticas Avanzadas"
                                        required
                                    />
                                </motion.div>

                                {/* Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 outline-none transition-all resize-none"
                                        placeholder="Describe el propósito de este workspace..."
                                        rows={3}
                                    />
                                </motion.div>

                                {/* Emoji Picker */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <EmojiPicker
                                        selected={formData.icon}
                                        onSelect={(emoji) => setFormData({ ...formData, icon: emoji })}
                                    />
                                </motion.div>

                                {/* Color Picker */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <ColorPicker
                                        selected={formData.color}
                                        onSelect={(color) => setFormData({ ...formData, color: color })}
                                    />
                                </motion.div>

                                {/* Buttons */}
                                <motion.div
                                    className="flex gap-4 pt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-6 rounded-lg transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || !formData.name.trim()}
                                        className="flex-1 bg-gradient-to-r from-accent-cyan to-highlight text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    ⚙️
                                                </motion.span>
                                                Guardando...
                                            </span>
                                        ) : (
                                            workspace ? 'Actualizar' : 'Crear Workspace'
                                        )}
                                    </button>
                                </motion.div>
                            </motion.form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
