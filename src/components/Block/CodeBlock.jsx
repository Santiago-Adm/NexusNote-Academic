import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CODE_LANGUAGES } from '../../utils/constants'
import { slideDown } from '../../utils/animations'

export default function CodeBlock({ content, onChange, readOnly = false }) {
    const [code, setCode] = useState(content?.code || '')
    const [language, setLanguage] = useState(content?.language || 'javascript')
    const [isSaving, setIsSaving] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        setCode(content?.code || '')
        setLanguage(content?.language || 'javascript')
    }, [content])

    // Debounced save
    useEffect(() => {
        if (code === content?.code && language === content?.language) return

        setIsSaving(true)
        const timer = setTimeout(() => {
            onChange({ code, language })
            setIsSaving(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [code, language, onChange, content?.code, content?.language])

    const handleKeyDown = (e) => {
        // Handle Tab key
        if (e.key === 'Tab') {
            e.preventDefault()
            const start = e.target.selectionStart
            const end = e.target.selectionEnd
            const newCode = code.substring(0, start) + '  ' + code.substring(end)
            setCode(newCode)
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 2
            }, 0)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
    }

    return (
        <div className="space-y-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Toolbar - Mac Terminal Style */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    {/* Window Controls */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>

                    {/* Language Selector */}
                    <div className="relative group">
                        <motion.select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={readOnly}
                            className="bg-transparent text-xs font-medium text-gray-600 focus:outline-none cursor-pointer appearance-none pr-4 hover:text-accent-cyan transition-colors"
                        >
                            {CODE_LANGUAGES.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </motion.select>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-gray-400">
                        {code.split('\n').length} lines
                    </span>

                    {/* Copy Button */}
                    <motion.button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-accent-cyan transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Copiar código"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Code Editor */}
            <div className="relative group">
                <motion.textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={readOnly}
                    placeholder="// Escribe tu código aquí..."
                    className="w-full min-h-[200px] bg-[#1e1e1e] text-gray-300 p-4 focus:outline-none resize-y font-mono text-sm leading-relaxed selection:bg-accent-cyan/30"
                    spellCheck="false"
                />

                {/* Auto-save indicator (Overlay) */}
                <AnimatePresence>
                    {isSaving && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-2 right-2 text-xs text-gray-500 flex items-center gap-1 bg-black/50 px-2 py-1 rounded"
                        >
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                ⟳
                            </motion.span>
                            Saving...
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
