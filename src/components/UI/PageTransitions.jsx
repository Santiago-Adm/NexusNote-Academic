import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Page Transition Wrapper
 * Wraps pages with smooth transition animations
 */
export function PageTransition({ children }) {
    const location = useLocation()

    const pageVariants = {
        initial: {
            opacity: 0,
            x: -20,
            scale: 0.98,
        },
        animate: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        exit: {
            opacity: 0,
            x: 20,
            scale: 0.98,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

/**
 * Slide Transition
 * Slides pages in from the side
 */
export function SlideTransition({ children, direction = 'left' }) {
    const location = useLocation()

    const slideVariants = {
        initial: {
            x: direction === 'left' ? -100 : 100,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            },
        },
        exit: {
            x: direction === 'left' ? 100 : -100,
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

/**
 * Fade Transition
 * Simple fade in/out
 */
export function FadeTransition({ children }) {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

/**
 * Scale Transition
 * Scales pages in/out
 */
export function ScaleTransition({ children }) {
    const location = useLocation()

    const scaleVariants = {
        initial: {
            scale: 0.9,
            opacity: 0,
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
            },
        },
        exit: {
            scale: 1.1,
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={scaleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

/**
 * Rotate Transition
 * Rotates pages in 3D space
 */
export function RotateTransition({ children }) {
    const location = useLocation()

    const rotateVariants = {
        initial: {
            rotateY: -90,
            opacity: 0,
        },
        animate: {
            rotateY: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        exit: {
            rotateY: 90,
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={rotateVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ perspective: 1000 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

/**
 * Loading Bar Component
 * Shows progress during page transitions
 */
export function LoadingBar({ isLoading }) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan via-highlight to-accent-teal z-[10000]"
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    animate={{
                        scaleX: [0, 0.3, 0.6, 0.9, 1],
                        transition: {
                            duration: 2,
                            ease: 'easeInOut',
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.3 },
                    }}
                />
            )}
        </AnimatePresence>
    )
}
