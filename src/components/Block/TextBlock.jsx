import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { glowAnimation, slideDown } from '../../utils/animations'

export default function TextBlock({ content, onChange, readOnly = false }) {
    const [text, setText] = useState(content?.text || '')
    const [isPreview, setIsPreview] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        setText(content?.text || '')
    }, [content])

    // Debounced save with indicator
    useEffect(() => {
        if (text === content?.text) return

        setIsSaving(true)
        const timer = setTimeout(() => {
            onChange({ text })
            setIsSaving(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [text, onChange, content?.text])

    const handleKeyDown = (e) => {
        // Handle Tab key
        if (e.key === 'Tab') {
            e.preventDefault()
            const start = e.target.selectionStart
            const end = e.target.selectionEnd
            const newText = text.substring(0, start) + '  ' + text.substring(end)
            setText(newText)
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 2
            }, 0)
        }
    }

    if (readOnly || isPreview) {
        return (
            <motion.div
                className="prose prose-gray max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {text ? (
                    <>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {text}
                        </ReactMarkdown>
                        {!readOnly && (
                            <button
                                onClick={() => setIsPreview(false)}
                                className="mt-4 text-sm text-accent-cyan hover:text-accent-teal transition-colors"
                            >
                                ✏️ Editar
                            </button>
                        )}
                    </>
                ) : (
                    <p className="text-gray-400 italic">Contenido vacío</p>
                )}
            </motion.div>
        )
    }

    return (
        <div className="relative group">
            {/* Floating Toolbar (appears on hover/focus) */}
            <AnimatePresence>
                {(isFocused || text.length > 0) && (
                    <motion.div
                        className="absolute -top-3 right-4 z-10 flex items-center gap-2 bg-white shadow-lg border border-gray-100 rounded-full px-3 py-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className="text-xs font-medium text-gray-500 hover:text-accent-cyan transition-colors flex items-center gap-1"
                        >
                            {isPreview ? '✏️ Editar' : '👁️ Vista'}
                        </button>
                        <div className="w-px h-3 bg-gray-200"></div>
                        <span className="text-[10px] text-gray-400">Markdown</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Editor */}
            <motion.div
                animate={isFocused ? {
                    boxShadow: '0 0 0 4px rgba(77, 184, 163, 0.1)',
                    borderColor: '#4db8a3'
                } : {
                    boxShadow: '0 0 0 0px rgba(0,0,0,0)',
                    borderColor: 'transparent'
                }}
                className="rounded-xl overflow-hidden transition-all duration-300 border border-transparent"
            >
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Escribe algo increíble..."
                    className="w-full min-h-[120px] bg-transparent text-gray-800 placeholder-gray-300 p-4 focus:outline-none resize-y text-base leading-relaxed"
                    style={{ lineHeight: '1.7' }}
                />
            </motion.div>

            {/* Footer Info */}
            <div className="flex justify-between items-center mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{text.length} chars</span>
                    <span>•</span>
                    <span>{text.split(/\s+/).filter(w => w).length} words</span>
                </div>

                {/* Save Indicator */}
                <AnimatePresence>
                    {isSaving && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-accent-cyan flex items-center gap-1"
                        >
                            <span className="animate-spin">⟳</span> Guardando
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
