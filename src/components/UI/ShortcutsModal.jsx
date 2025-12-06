import { motion, AnimatePresence } from 'framer-motion'
import { KEYBOARD_SHORTCUTS } from '../../utils/shortcuts'
import { modalOverlay, modalContent } from '../../utils/animations'

export default function ShortcutsModal({ isOpen, onClose }) {
    const shortcutGroups = {
        'General': ['Ctrl+K', 'Ctrl+N', 'Ctrl+P', 'Escape'],
        'Edición': ['Ctrl+B', 'Ctrl+I', 'Ctrl+Z', 'Ctrl+Shift+Z'],
        'Bloques': ['Ctrl+D', 'Ctrl+ArrowUp', 'Ctrl+ArrowDown', 'Delete'],
        'Ayuda': ['Ctrl+/', 'Ctrl+?'],
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    variants={modalOverlay}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-bg-secondary/95 backdrop-blur-xl border border-highlight/30 rounded-lg shadow-2xl max-w-3xl w-full p-8"
                        variants={modalContent}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-white">
                                ⌨️ Atajos de Teclado
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

                        {/* Shortcuts Grid */}
                        <div className="space-y-6">
                            {Object.entries(shortcutGroups).map(([group, shortcuts]) => (
                                <div key={group}>
                                    <h3 className="text-lg font-semibold text-accent-cyan mb-3">
                                        {group}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {shortcuts.map((shortcut) => {
                                            const config = KEYBOARD_SHORTCUTS[shortcut]
                                            if (!config) return null

                                            return (
                                                <motion.div
                                                    key={shortcut}
                                                    className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-accent-blue/30"
                                                    whileHover={{ scale: 1.02, borderColor: 'rgba(77, 184, 163, 0.5)' }}
                                                >
                                                    <span className={`text-gray-300 ${config.disabled ? 'opacity-50' : ''}`}>
                                                        {config.description}
                                                    </span>
                                                    <kbd className="px-3 py-1 bg-bg-secondary border border-accent-cyan/30 rounded text-highlight font-mono text-sm">
                                                        {shortcut.replace('Ctrl', '⌘').replace('Shift', '⇧').replace('ArrowUp', '↑').replace('ArrowDown', '↓')}
                                                    </kbd>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-accent-blue/30 text-center text-sm text-gray-400">
                            Presiona <kbd className="px-2 py-1 bg-bg-primary rounded border border-accent-cyan/30 text-highlight">Ctrl+/</kbd> en cualquier momento para ver esta ayuda
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
