import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Confetti Particle Effect
 * Triggers celebration confetti animation
 */
export function Confetti({ trigger = false, duration = 3000 }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (!trigger) return

        const colors = ['#4db8a3', '#2d7a8e', '#3a9299', '#1a4d6f']
        const particleCount = 50

        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: -20,
            rotation: Math.random() * 360,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            velocityX: (Math.random() - 0.5) * 200,
            velocityY: Math.random() * 300 + 200,
        }))

        setParticles(newParticles)

        const timer = setTimeout(() => {
            setParticles([])
        }, duration)

        return () => clearTimeout(timer)
    }, [trigger, duration])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            borderRadius: '50%',
                        }}
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            rotate: particle.rotation,
                            opacity: 1,
                        }}
                        animate={{
                            x: particle.x + particle.velocityX,
                            y: window.innerHeight + 100,
                            rotate: particle.rotation + 720,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 3,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}

/**
 * Sparkles Effect
 * Triggers sparkle particles around an element
 */
export function Sparkles({ trigger = false, count = 20 }) {
    const [sparkles, setSparkles] = useState([])

    useEffect(() => {
        if (!trigger) return

        const newSparkles = Array.from({ length: count }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.5,
            delay: Math.random() * 0.3,
        }))

        setSparkles(newSparkles)

        const timer = setTimeout(() => {
            setSparkles([])
        }, 2000)

        return () => clearTimeout(timer)
    }, [trigger, count])

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        className="absolute top-1/2 left-1/2"
                        initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1,
                        }}
                        animate={{
                            x: sparkle.x,
                            y: sparkle.y,
                            scale: sparkle.scale,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            delay: sparkle.delay,
                            ease: 'easeOut',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                                fill="#4db8a3"
                                opacity="0.8"
                            />
                        </svg>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

/**
 * Success Burst Effect
 * Quick burst of particles for micro-celebrations
 */
export function SuccessBurst({ trigger = false, x = 0, y = 0 }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (!trigger) return

        const particleCount = 12
        const newParticles = Array.from({ length: particleCount }, (_, i) => {
            const angle = (i / particleCount) * Math.PI * 2
            return {
                id: Date.now() + i,
                x: Math.cos(angle) * 50,
                y: Math.sin(angle) * 50,
            }
        })

        setParticles(newParticles)

        const timer = setTimeout(() => {
            setParticles([])
        }, 800)

        return () => clearTimeout(timer)
    }, [trigger])

    return (
        <div
            className="absolute pointer-events-none z-50"
            style={{ left: x, top: y }}
        >
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-highlight rounded-full"
                        initial={{
                            x: 0,
                            y: 0,
                            scale: 1,
                            opacity: 1,
                        }}
                        animate={{
                            x: particle.x,
                            y: particle.y,
                            scale: 0,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}

/**
 * Floating Hearts Effect
 * For special celebrations
 */
export function FloatingHearts({ trigger = false, count = 10 }) {
    const [hearts, setHearts] = useState([])

    useEffect(() => {
        if (!trigger) return

        const newHearts = Array.from({ length: count }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
        }))

        setHearts(newHearts)

        const timer = setTimeout(() => {
            setHearts([])
        }, 4000)

        return () => clearTimeout(timer)
    }, [trigger, count])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-4xl"
                        style={{ left: heart.x }}
                        initial={{
                            y: window.innerHeight + 50,
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1.2, 1, 0.8],
                            x: [0, 20, -20, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            ease: 'easeOut',
                        }}
                    >
                        💚
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

/**
 * Custom hook for triggering particle effects
 */
export function useParticleEffect() {
    const [confetti, setConfetti] = useState(false)
    const [sparkles, setSparkles] = useState(false)
    const [burst, setBurst] = useState(false)
    const [hearts, setHearts] = useState(false)

    const triggerConfetti = () => {
        setConfetti(true)
        setTimeout(() => setConfetti(false), 100)
    }

    const triggerSparkles = () => {
        setSparkles(true)
        setTimeout(() => setSparkles(false), 100)
    }

    const triggerBurst = () => {
        setBurst(true)
        setTimeout(() => setBurst(false), 100)
    }

    const triggerHearts = () => {
        setHearts(true)
        setTimeout(() => setHearts(false), 100)
    }

    return {
        confetti,
        sparkles,
        burst,
        hearts,
        triggerConfetti,
        triggerSparkles,
        triggerBurst,
        triggerHearts,
    }
}
