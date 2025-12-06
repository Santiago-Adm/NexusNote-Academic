import { motion, AnimatePresence } from 'framer-motion'
import { BLOCK_CONTEXT_MENU } from '../../utils/shortcuts'

export default function ContextMenu({ x, y, onAction, onClose }) {
    const menuWidth = 200
    const menuHeight = BLOCK_CONTEXT_MENU.length * 40

    // Adjust position if menu would go off screen
    const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x
    const adjustedY = y + menuHeight > window.innerHeight ? y - menuHeight : y

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="absolute bg-bg-secondary/95 backdrop-blur-md border border-accent-cyan/30 rounded-lg shadow-2xl py-2 min-w-[200px] z-50"
                    style={{
                        left: adjustedX,
                        top: adjustedY,
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {BLOCK_CONTEXT_MENU.map((item) => (
                        <motion.button
                            key={item.action}
                            disabled={item.disabled}
                            className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors duration-150 ${item.danger
                                ? 'text-red-400 hover:bg-red-500/10'
                                : 'text-white hover:bg-highlight/10'
                                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => {
                                if (!item.disabled) {
                                    onAction(item.action)
                                    onClose()
                                }
                            }}
                            whileHover={!item.disabled ? { x: 5 } : {}}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="flex-1">{item.label}</span>
                            {item.shortcut && (
                                <kbd className="text-xs text-gray-400 font-mono">
                                    {item.shortcut}
                                </kbd>
                            )}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
