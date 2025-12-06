import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getTemplates, createPageFromTemplate } from '../../services/templateService'
import { getCurrentUserId } from '../../services/storageService'
import { toastConfig } from '../UI/Toast'
import { staggerContainer, fadeIn } from '../../utils/animations'

const CATEGORIES = [
    { id: 'all', label: 'Todos', icon: '📚' },
    { id: 'academic', label: 'Académico', icon: '🎓' },
    { id: 'project', label: 'Proyectos', icon: '💼' },
    { id: 'meeting', label: 'Reuniones', icon: '📅' },
    { id: 'personal', label: 'Personal', icon: '✨' },
]

export default function TemplateGallery({ workspaceId, onTemplateUsed, onClose }) {
    const [templates, setTemplates] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [creatingFrom, setCreatingFrom] = useState(null)

    useEffect(() => {
        loadTemplates()
    }, [])

    const loadTemplates = async () => {
        try {
            const userId = await getCurrentUserId()
            const data = await getTemplates(userId)
            setTemplates(data)
        } catch (error) {
            console.error('Error loading templates:', error)
            toastConfig.error('Error al cargar plantillas')
        } finally {
            setLoading(false)
        }
    }

    const handleUseTemplate = async (template) => {
        setCreatingFrom(template.id)
        try {
            const pageName = `${template.name} - ${new Date().toLocaleDateString()}`
            const newPage = await createPageFromTemplate(template.id, workspaceId, pageName)

            toastConfig.success(`Página creada desde plantilla: ${template.name}`)
            if (onTemplateUsed) onTemplateUsed(newPage)
            if (onClose) onClose()
        } catch (error) {
            console.error('Error creating page from template:', error)
            toastConfig.error('Error al crear página desde plantilla')
        } finally {
            setCreatingFrom(null)
        }
    }

    const filteredTemplates =
        selectedCategory === 'all' ? templates : templates.filter((t) => t.category === selectedCategory)

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="!fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-black/50 !backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Plantillas</h2>
                            <p className="text-sm text-gray-600 mt-1">Crea una página desde una plantilla predefinida</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 hover:bg-accent-cyan/20 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Categories */}
                <div className="px-6 py-4 border-b border-gray-200 overflow-x-auto">
                    <div className="flex gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedCategory === cat.id
                                    ? 'bg-accent-cyan text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span className="text-sm font-medium">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-accent-cyan">Cargando plantillas...</div>
                        </div>
                    ) : filteredTemplates.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {filteredTemplates.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    onUse={() => handleUseTemplate(template)}
                                    isCreating={creatingFrom === template.id}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No hay plantillas en esta categoría</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    )
}

function TemplateCard({ template, onUse, isCreating }) {
    return (
        <motion.div
            variants={fadeIn}
            whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(45, 122, 142, 0.15)' }}
            className="bg-white border-2 border-gray-200 hover:border-accent-cyan rounded-xl p-4 cursor-pointer group transition-all shadow-sm"
            onClick={onUse}
        >
            {/* Icon & Category */}
            <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan to-highlight flex items-center justify-center text-2xl shadow-sm">
                    {template.icon}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan font-medium">
                    {template.category}
                </span>
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-cyan transition-colors">
                {template.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{template.blocks?.length || 0} bloques</span>
                {template.is_public && <span className="text-accent-cyan">✨ Público</span>}
            </div>

            {/* Use Button */}
            <button
                disabled={isCreating}
                className="w-full px-4 py-2 bg-gradient-to-r from-accent-cyan to-highlight rounded-lg text-white font-medium hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isCreating ? 'Creando...' : 'Usar Plantilla'}
            </button>
        </motion.div>
    )
}
