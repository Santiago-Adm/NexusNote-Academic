import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { uploadFile, deleteFile, getCurrentUserId, formatFileSize } from '../../services/storageService'
import { toastConfig } from '../UI/Toast'

export default function PDFBlock({ content, onChange, onDelete }) {
    const [uploading, setUploading] = useState(false)
    const [pdfUrl, setPdfUrl] = useState(content?.url || null)
    const [title, setTitle] = useState(content?.title || '')
    const fileInputRef = useRef(null)

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.type !== 'application/pdf') {
            toastConfig.error('Solo se permiten archivos PDF')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            toastConfig.error('El PDF no debe superar 10MB')
            return
        }

        setUploading(true)
        try {
            const userId = await getCurrentUserId()
            const { path, url } = await uploadFile(file, userId)

            setPdfUrl(url)
            setTitle(file.name)
            onChange({
                url,
                path,
                title: file.name,
                fileName: file.name,
                fileSize: file.size,
            })

            toastConfig.success('PDF subido correctamente')
        } catch (error) {
            toastConfig.error('Error al subir PDF')
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('¿Eliminar este PDF?')) return

        try {
            if (content?.path) {
                await deleteFile(content.path)
            }
            if (onDelete) onDelete()
            toastConfig.success('PDF eliminado')
        } catch (error) {
            toastConfig.error('Error al eliminar')
        }
    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value
        setTitle(newTitle)
        onChange({ ...content, title: newTitle })
    }

    if (!pdfUrl) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-dashed border-accent-cyan/30 rounded-lg p-8 text-center hover:border-highlight/50 transition-colors duration-300"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="mx-auto flex flex-col items-center gap-3 text-gray-400 hover:text-highlight transition-colors disabled:opacity-50"
                >
                    <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="text-sm font-medium">
                        {uploading ? 'Subiendo...' : 'Click para subir PDF'}
                    </span>
                    <span className="text-xs text-gray-500">Máximo 10MB</span>
                </motion.button>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative border border-accent-cyan/30 rounded-lg p-4 bg-bg-secondary/30 hover:border-highlight/50 transition-colors duration-300"
        >
            <div className="flex items-start gap-4 mb-4">
                {/* Icono */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Nombre del archivo..."
                        className="w-full bg-transparent border-none outline-none text-gray-100 font-medium mb-1 focus:text-highlight transition-colors"
                    />
                    <p className="text-sm text-gray-500">
                        {formatFileSize(content?.fileSize || 0)} • PDF
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                    <motion.a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-accent-cyan/20 rounded-lg transition-colors"
                        title="Descargar PDF"
                    >
                        <svg
                            className="w-5 h-5 text-accent-cyan"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Eliminar PDF"
                    >
                        <svg
                            className="w-5 h-5 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Preview (iframe) */}
            <div className="rounded-lg overflow-hidden border border-accent-blue/20">
                <iframe
                    src={pdfUrl}
                    className="w-full h-96 bg-white"
                    title={title}
                />
            </div>
        </motion.div>
    )
}
