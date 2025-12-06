import { motion, AnimatePresence } from 'framer-motion'
import { modalOverlay, modalContent } from '../../utils/animations'

/**
 * Enhanced Glassmorphism Modal Component
 * Provides consistent glassmorphism styling across all modals
 */
export default function GlassModal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-2xl',
    showCloseButton = true,
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay with enhanced blur */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                        }}
                        variants={modalOverlay}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    >
                        {/* Modal Content with Glassmorphism */}
                        <motion.div
                            className={`p-8 rounded-2xl shadow-2xl ${maxWidth} w-full border border-highlight/30 relative overflow-hidden`}
                            style={{
                                background: 'linear-gradient(135deg, rgba(13, 33, 55, 0.95) 0%, rgba(26, 77, 111, 0.9) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                boxShadow: '0 8px 32px 0 rgba(77, 184, 163, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                            }}
                            variants={modalContent}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Gradient overlay for extra depth */}
                            <div
                                className="absolute inset-0 opacity-30 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at top right, rgba(77, 184, 163, 0.2), transparent 70%)',
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    {title && (
                                        <motion.h2
                                            className="text-3xl font-bold bg-gradient-to-r from-white to-highlight bg-clip-text text-transparent"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {title}
                                        </motion.h2>
                                    )}
                                    {showCloseButton && (
                                        <motion.button
                                            onClick={onClose}
                                            className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl p-2 hover:bg-white/10 rounded-lg"
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            ✕
                                        </motion.button>
                                    )}
                                </div>

                                {/* Children */}
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

/**
 * Enhanced Glassmorphism Card Component
 * For use in grids and lists
 */
export function GlassCard({
    children,
    onClick,
    className = '',
    hoverable = true,
    gradient = true,
}) {
    return (
        <motion.div
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-xl p-6
                border border-accent-blue/30
                ${hoverable ? 'cursor-pointer' : ''}
                ${className}
            `}
            style={{
                background: gradient
                    ? 'linear-gradient(145deg, rgba(13, 33, 55, 0.8), rgba(45, 122, 142, 0.6))'
                    : 'rgba(13, 33, 55, 0.5)',
                backdropFilter: 'blur(10px) saturate(150%)',
                WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                boxShadow: '0 4px 16px 0 rgba(26, 77, 111, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
            }}
            whileHover={hoverable ? {
                scale: 1.02,
                y: -4,
                boxShadow: '0 12px 32px 0 rgba(77, 184, 163, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(77, 184, 163, 0.5)',
            } : {}}
            whileTap={hoverable ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Shine effect on hover */}
            {hoverable && (
                <motion.div
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                    }}
                    whileHover={{ opacity: 1, x: ['0%', '200%'] }}
                    transition={{ duration: 0.6 }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}

/**
 * Enhanced Glassmorphism Dropdown Component
 */
export function GlassDropdown({
    isOpen,
    items,
    onSelect,
    className = '',
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`absolute mt-2 rounded-lg overflow-hidden border border-accent-blue/30 ${className}`}
                    style={{
                        background: 'rgba(13, 33, 55, 0.95)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    {items.map((item, index) => (
                        <motion.button
                            key={index}
                            onClick={() => onSelect(item)}
                            className="w-full px-4 py-3 text-left text-white hover:bg-highlight/20 transition-colors duration-200 border-b border-accent-blue/20 last:border-b-0"
                            whileHover={{ x: 5, backgroundColor: 'rgba(77, 184, 163, 0.2)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {item.label || item}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
