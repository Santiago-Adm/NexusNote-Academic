import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { modalOverlay, menuVariants, menuItemVariants } from '../../utils/animations'

const COMMANDS = [
    {
        id: 'create-workspace',
        icon: '📁',
        label: 'Crear Workspace',
        keywords: ['nuevo', 'workspace', 'crear', 'espacio'],
        action: 'create-workspace'
    },
    {
        id: 'create-page',
        icon: '📄',
        label: 'Crear Página',
        keywords: ['nueva', 'página', 'crear', 'page'],
        action: 'create-page'
    },
    {
        id: 'navigate-dashboard',
        icon: '🏠',
        label: 'Ir al Dashboard',
        keywords: ['dashboard', 'inicio', 'home', 'ir'],
        action: 'navigate-dashboard'
    },
    {
        id: 'search-pages',
        icon: '🔍',
        label: 'Buscar Páginas',
        keywords: ['buscar', 'search', 'páginas', 'encontrar'],
        action: 'search-pages'
    },
]

export default function CommandPalette({ isOpen, onClose, onCommand }) {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [filteredCommands, setFilteredCommands] = useState(COMMANDS)
    const navigate = useNavigate()

    const fuse = new Fuse(COMMANDS, {
        keys: ['label', 'keywords'],
        threshold: 0.3,
    })

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredCommands(COMMANDS)
        } else {
            const results = fuse.search(query)
            setFilteredCommands(results.map(r => r.item))
        }
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
            } else if (e.key === 'Enter') {
                e.preventDefault()
                if (filteredCommands[selectedIndex]) {
                    handleExecuteCommand(filteredCommands[selectedIndex])
                }
            } else if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, selectedIndex, filteredCommands])

    const handleExecuteCommand = (command) => {
        onCommand?.(command.action)
        onClose()
        setQuery('')
    }

    const handleExecute = (command) => {
        handleExecuteCommand(command);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={modalOverlay}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                        {/* Input */}
                        <div className="p-4 border-b border-gray-200">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Buscar comandos o crear..."
                                className="w-full px-4 py-3 text-lg bg-transparent border-none text-gray-900 placeholder-gray-400 outline-none"
                                autoFocus
                            />
                        </div>

                        {/* Results */}
                        <div className="max-h-96 overflow-y-auto">
                            {filteredCommands.length > 0 ? (
                                <motion.div variants={menuVariants}>
                                    {filteredCommands.map((command, index) => (
                                        <motion.button
                                            key={command.id}
                                            variants={menuItemVariants}
                                            onClick={() => handleExecute(command)}
                                            className={`w-full flex items-center gap-4 px-6 py-3 text-left transition-colors ${index === selectedIndex
                                                    ? 'bg-gray-50'
                                                    : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="text-2xl">{command.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{command.label}</p>
                                            </div>
                                            {index === selectedIndex && (
                                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                                    Enter
                                                </span>
                                            )}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No se encontraron comandos
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
