import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GRID_TYPES } from '../../utils/constants'

export default function PageModal({ isOpen, onClose, onSave, workspaceId, page = null }) {
    const [formData, setFormData] = useState({
        title: '',
        grid_type: 'none',
        color: 'ocean'
    })
    const [loading, setLoading] = useState(false)

    const GRADIENTS = [
        { id: 'ocean', name: 'Ocean', class: 'from-blue-400 to-blue-600', style: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
        { id: 'royal', name: 'Royal', class: 'from-purple-400 to-purple-600', style: 'linear-gradient(135deg, #c084fc, #9333ea)' },
        { id: 'nature', name: 'Nature', class: 'from-green-400 to-green-600', style: 'linear-gradient(135deg, #4ade80, #16a34a)' },
        { id: 'sunset', name: 'Sunset', class: 'from-orange-400 to-orange-600', style: 'linear-gradient(135deg, #fb923c, #ea580c)' },
        { id: 'berry', name: 'Berry', class: 'from-pink-400 to-pink-600', style: 'linear-gradient(135deg, #f472b6, #db2777)' },
        { id: 'teal', name: 'Teal', class: 'from-teal-400 to-teal-600', style: 'linear-gradient(135deg, #2dd4bf, #0d9488)' },
        { id: 'indigo', name: 'Indigo', class: 'from-indigo-400 to-indigo-600', style: 'linear-gradient(135deg, #818cf8, #4f46e5)' },
        { id: 'fire', name: 'Fire', class: 'from-red-400 to-red-600', style: 'linear-gradient(135deg, #f87171, #dc2626)' },
    ]

    useEffect(() => {
        if (page) {
            setFormData({
                title: page.title,
                grid_type: page.grid_type || 'none',
                color: page.color || 'ocean'
            })
        } else {
            setFormData({
                title: '',
                grid_type: 'none',
                color: 'ocean'
            })
        }
    }, [page, isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await onSave(formData)
            onClose()
        } catch (error) {
            console.error('Error saving page:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    // Use Portal to render outside the DOM hierarchy
    return createPortal(
        <div className="!fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-black/60 !backdrop-blur-sm p-4">
            <div
                className="p-8 rounded-2xl shadow-2xl max-w-2xl w-full bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {page ? 'Editar Página' : 'Nueva Página'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-300 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Título de la Página *
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 outline-none transition-colors text-base text-gray-900 focus:border-accent-cyan"
                            placeholder="Ej: Notas de Cálculo I"
                            required
                        />
                    </div>

                    {/* Color Selector */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Elige un color
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {GRADIENTS.map((gradient) => (
                                <button
                                    key={gradient.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color: gradient.id })}
                                    className={`w-full h-12 rounded-lg transition-all ${formData.color === gradient.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'hover:scale-105'}`}
                                    style={{ background: gradient.style }}
                                    title={gradient.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Grid Type */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Tipo de Cuadrícula
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {GRID_TYPES.map(({ value, label, icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, grid_type: value })}
                                    className={`
                    p-4 rounded-lg border-2 transition-all duration-300
                    flex items-center gap-3
                    ${formData.grid_type === value
                                            ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan'
                                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                                        }
                  `}
                                >
                                    <span className="text-2xl">{icon}</span>
                                    <span className="font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-lg font-semibold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !formData.title.trim()}
                            className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)'
                            }}
                        >
                            {loading ? 'Guardando...' : page ? 'Actualizar' : 'Crear Página'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}

// Grid Preview Component
function GridPreview({ gridType }) {
    const patterns = {
        dots: (
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#2d7a8e" opacity="0.3" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
        ),
        squares: (
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2d7a8e" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#squares)" />
            </svg>
        ),
        lines: (
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="lines" x="0" y="0" width="100" height="30" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="100" y2="0" stroke="#2d7a8e" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#lines)" />
            </svg>
        ),
    }

    return patterns[gridType] || null
}
