import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Animated Button Component with hover, tap, and loading states
 */
export function AnimatedButton({
    children,
    onClick,
    variant = 'primary',
    loading = false,
    disabled = false,
    className = '',
    ...props
}) {
    const variants = {
        primary: 'bg-gradient-to-r from-accent-cyan to-highlight text-white',
        secondary: 'bg-bg-secondary border-2 border-accent-cyan text-accent-cyan hover:bg-accent-blue/20',
        danger: 'bg-red-500/80 hover:bg-red-500 text-white',
        ghost: 'bg-transparent border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10',
    }

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${variants[variant]}
                font-semibold py-3 px-6 rounded-lg
                shadow-lg shadow-accent-blue/20
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            whileHover={!disabled && !loading ? { scale: 1.05, brightness: 1.1 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...props}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        ⏳
                    </motion.span>
                    Cargando...
                </span>
            ) : (
                children
            )}
        </motion.button>
    )
}

/**
 * Animated Input Component with focus glow and error shake
 */
export function AnimatedInput({
    label,
    error,
    success,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-accent-teal mb-2">
                    {label}
                </label>
            )}
            <motion.div
                animate={error ? {
                    x: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.4 }
                } : {}}
            >
                <motion.input
                    className={`
                        w-full bg-bg-primary border-2 rounded-lg px-4 py-3
                        text-white placeholder-gray-400
                        focus:outline-none
                        transition-all duration-300
                        ${error ? 'border-red-500' : success ? 'border-green-500' : 'border-accent-cyan'}
                        ${className}
                    `}
                    whileFocus={{
                        borderColor: error ? '#ef4444' : success ? '#22c55e' : '#4db8a3',
                        boxShadow: error
                            ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                            : success
                                ? '0 0 0 3px rgba(34, 197, 94, 0.1)'
                                : '0 0 0 3px rgba(77, 184, 163, 0.1)',
                    }}
                    transition={{ duration: 0.2 }}
                    {...props}
                />
            </motion.div>
            {error && (
                <motion.p
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.p>
            )}
            {success && (
                <motion.div
                    className="flex items-center gap-2 text-green-400 text-sm mt-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                        ✓
                    </motion.span>
                    {success}
                </motion.div>
            )}
        </div>
    )
}

/**
 * Animated Textarea Component
 */
export function AnimatedTextarea({
    label,
    error,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-accent-teal mb-2">
                    {label}
                </label>
            )}
            <motion.textarea
                className={`
                    w-full bg-bg-primary border-2 border-accent-cyan rounded-lg px-4 py-3
                    text-white placeholder-gray-400
                    focus:outline-none
                    transition-all duration-300
                    resize-none
                    ${error ? 'border-red-500' : ''}
                    ${className}
                `}
                whileFocus={{
                    borderColor: error ? '#ef4444' : '#4db8a3',
                    boxShadow: error
                        ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                        : '0 0 0 3px rgba(77, 184, 163, 0.1)',
                }}
                transition={{ duration: 0.2 }}
                {...props}
            />
            {error && (
                <motion.p
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    )
}

/**
 * Ripple Effect Component (optional enhancement)
 */
export function RippleButton({ children, onClick, className = '', ...props }) {
    const [ripples, setRipples] = useState([])

    const addRipple = (e) => {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        const newRipple = { x, y, size, id: Date.now() }
        setRipples([...ripples, newRipple])

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
        }, 600)

        onClick?.(e)
    }

    return (
        <button
            onClick={addRipple}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            {children}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}
        </button>
    )
}
