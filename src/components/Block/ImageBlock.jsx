import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadFile, deleteFile, getCurrentUserId } from '../../services/storageService'
import { toastConfig } from '../UI/Toast'

export default function ImageBlock({ content, onChange, onDelete }) {
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(content?.url || null)
    const [caption, setCaption] = useState(content?.caption || '')
    const [showFullscreen, setShowFullscreen] = useState(false)
    const fileInputRef = useRef(null)

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tipo
        if (!file.type.startsWith('image/')) {
            toastConfig.error('Solo se permiten imágenes')
            return
        }

        // Validar tamaño (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toastConfig.error('La imagen no debe superar 5MB')
            return
        }

        setUploading(true)
        try {
            const userId = await getCurrentUserId()
            const { path, url } = await uploadFile(file, userId)

            setImageUrl(url)
            onChange({
                url,
                path,
                caption,
                fileName: file.name,
                fileSize: file.size,
                mimeType: file.type,
            })

            toastConfig.success('Imagen subida correctamente')
        } catch (error) {
            toastConfig.error('Error al subir imagen')
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('¿Eliminar esta imagen?')) return

        try {
            if (content?.path) {
                await deleteFile(content.path)
            }
            if (onDelete) onDelete()
            toastConfig.success('Imagen eliminada')
        } catch (error) {
            toastConfig.error('Error al eliminar')
        }
    }

    const handleCaptionChange = (e) => {
        const newCaption = e.target.value
        setCaption(newCaption)
        onChange({ ...content, caption: newCaption })
    }

    if (!imageUrl) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 bg-gray-50/50 hover:bg-blue-50/50 hover:border-accent-cyan/50 transition-all duration-300 flex flex-col items-center justify-center gap-4 group-hover:shadow-lg">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300"
                        animate={uploading ? { rotate: 360 } : {}}
                        transition={uploading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
                    >
                        {uploading ? '⏳' : '🖼️'}
                    </motion.div>

                    <div className="text-center">
                        <h3 className="text-gray-700 font-medium mb-1 group-hover:text-accent-cyan transition-colors">
                            {uploading ? 'Subiendo imagen...' : 'Arrastra o haz click para subir'}
                        </h3>
                        <p className="text-xs text-gray-400">
                            Soporta JPG, PNG, GIF, WebP (Max 5MB)
                        </p>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative rounded-2xl overflow-hidden bg-black/5 shadow-inner"
        >
            {/* Image Container */}
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={caption || 'Imagen'}
                    className="w-full h-auto max-h-[600px] object-contain bg-[#1a1a1a]"
                    loading="lazy"
                />

                {/* Glass Overlay Controls */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowFullscreen(true)}
                        className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white shadow-xl border border-white/10"
                        title="Ver pantalla completa"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </motion.button>

                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        className="p-4 bg-red-500/80 hover:bg-red-500 backdrop-blur-md rounded-full text-white shadow-xl border border-white/10"
                        title="Eliminar imagen"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Caption - Sleek Input */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <input
                    type="text"
                    value={caption}
                    onChange={handleCaptionChange}
                    placeholder="Escribe una descripción..."
                    className="w-full bg-transparent border-none text-white placeholder-white/50 text-sm text-center focus:outline-none focus:ring-0"
                />
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {showFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowFullscreen(false)}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 cursor-zoom-out"
                    >
                        <motion.img
                            src={imageUrl}
                            alt={caption}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        />
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
