import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const session = localStorage.getItem('supabase_session')
        if (session) {
            navigate('/dashboard')
        }
    }, [navigate])

    return (
        <div
            className="min-h-screen relative overflow-hidden"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2f1 100%)'
            }}
        >
            {/* Animated Background Blobs - More Vibrant */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(45, 122, 142, 0.3) 0%, transparent 70%)',
                        top: '-15%',
                        right: '-10%'
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: '700px',
                        height: '700px',
                        background: 'radial-gradient(circle, rgba(77, 184, 163, 0.3) 0%, transparent 70%)',
                        bottom: '-20%',
                        left: '-15%'
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(58, 146, 153, 0.25) 0%, transparent 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <nav className="px-8 py-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                                    color: 'white'
                                }}
                            >
                                N
                            </div>
                            <span className="text-xl font-bold" style={{ color: '#1a1a1a' }}>
                                NexusNote
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-5 py-2 text-sm font-semibold rounded-lg transition-all"
                                style={{
                                    color: '#2d7a8e',
                                    backgroundColor: 'white',
                                    border: '2px solid transparent'
                                }}
                                onMouseEnter={(e) => e.target.style.borderColor = '#2d7a8e'}
                                onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2 text-sm font-semibold rounded-lg shadow-lg transition-all"
                                style={{
                                    background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                                    color: 'white'
                                }}
                            >
                                Comenzar gratis
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section - Centered */}
                <section className="px-8 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-black mb-6"
                            style={{
                                color: '#1a1a1a',
                                fontSize: '4rem',
                                lineHeight: '1.1',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Tu espacio de trabajo académico
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-xl mb-10"
                            style={{
                                color: '#4b5563',
                                maxWidth: '600px',
                                margin: '0 auto 2.5rem',
                                lineHeight: '1.7',
                                fontSize: '1.25rem'
                            }}
                        >
                            Organiza tus notas, proyectos y tareas en un solo lugar.
                            Diseñado para estudiantes que buscan excelencia.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex gap-4 justify-center"
                        >
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-10 py-4 text-lg font-bold rounded-xl transition-all transform hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                                    color: 'white',
                                    boxShadow: '0 10px 30px rgba(45, 122, 142, 0.4)'
                                }}
                            >
                                Comenzar gratis
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-10 py-4 text-lg font-bold rounded-xl transition-all transform hover:scale-105"
                                style={{
                                    backgroundColor: 'white',
                                    border: '2px solid #2d7a8e',
                                    color: '#2d7a8e',
                                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                Ver demo
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Cards - Vibrant */}
                <section className="px-8 py-16">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {[
                                { number: '10K+', label: 'Estudiantes activos', gradient: 'linear-gradient(135deg, #2d7a8e, #3a9299)' },
                                { number: '50K+', label: 'Notas creadas', gradient: 'linear-gradient(135deg, #3a9299, #4db8a3)' },
                                { number: '99%', label: 'Satisfacción', gradient: 'linear-gradient(135deg, #4db8a3, #5ec9b5)' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(45, 122, 142, 0.25)' }}
                                    className="p-8 rounded-2xl text-center relative overflow-hidden"
                                    style={{
                                        backgroundColor: 'white',
                                        border: '2px solid rgba(45, 122, 142, 0.1)',
                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)'
                                    }}
                                >
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1"
                                        style={{ background: stat.gradient }}
                                    />
                                    <div
                                        className="text-6xl font-black mb-3"
                                        style={{
                                            background: stat.gradient,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {stat.number}
                                    </div>
                                    <p className="text-base font-semibold" style={{ color: '#6b7280' }}>
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Feature Cards - Vibrant with Colored Backgrounds */}
                <section className="px-8 py-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Feature Card 1 - Cyan */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(45, 122, 142, 0.3)' }}
                                transition={{ duration: 0.3 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl text-center relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(45, 122, 142, 0.08) 0%, rgba(45, 122, 142, 0.02) 100%)',
                                    border: '2px solid rgba(45, 122, 142, 0.2)',
                                    boxShadow: '0 10px 30px rgba(45, 122, 142, 0.15)',
                                    backgroundColor: 'white'
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #2d7a8e, #3a9299)'
                                    }}
                                >
                                    📝
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
                                    Notas inteligentes
                                </h3>
                                <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                                    Crea y organiza tus notas con un editor potente y fácil de usar.
                                    Soporta texto, código, tareas y más.
                                </p>
                            </motion.div>

                            {/* Feature Card 2 - Teal */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(58, 146, 153, 0.3)' }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl text-center relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(58, 146, 153, 0.08) 0%, rgba(58, 146, 153, 0.02) 100%)',
                                    border: '2px solid rgba(58, 146, 153, 0.2)',
                                    boxShadow: '0 10px 30px rgba(58, 146, 153, 0.15)',
                                    backgroundColor: 'white'
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #3a9299, #4db8a3)'
                                    }}
                                >
                                    📊
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
                                    Gestión de proyectos
                                </h3>
                                <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                                    Administra tus proyectos académicos con tableros visuales.
                                    Mantén todo organizado.
                                </p>
                            </motion.div>

                            {/* Feature Card 3 - Green */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(77, 184, 163, 0.3)' }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl text-center relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(77, 184, 163, 0.08) 0%, rgba(77, 184, 163, 0.02) 100%)',
                                    border: '2px solid rgba(77, 184, 163, 0.2)',
                                    boxShadow: '0 10px 30px rgba(77, 184, 163, 0.15)',
                                    backgroundColor: 'white'
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #4db8a3, #5ec9b5)'
                                    }}
                                >
                                    🎯
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
                                    Seguimiento de objetivos
                                </h3>
                                <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                                    Establece metas y monitorea tu progreso académico.
                                    Mantente enfocado.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section >

                {/* Final CTA */}
                < section className="px-8 py-24" >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="text-5xl font-black mb-6"
                                style={{ color: '#1a1a1a', lineHeight: '1.2' }}
                            >
                                Comienza tu viaje académico hoy
                            </h2>
                            <p className="text-xl mb-10 font-medium" style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                                Únete a miles de estudiantes que ya organizan su vida académica
                            </p>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-12 py-5 text-xl font-bold rounded-xl transition-all transform hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                                    color: 'white',
                                    boxShadow: '0 15px 35px rgba(45, 122, 142, 0.4)'
                                }}
                            >
                                Crear cuenta gratis →
                            </button>
                        </motion.div>
                    </div>
                </section >

                {/* Footer */}
                < footer className="px-8 py-12" >
                    <div className="max-w-7xl mx-auto text-center">
                        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                            © 2024 NexusNote Academic. Diseñado para estudiantes excelentes.
                        </p>
                    </div>
                </footer >
            </div >
        </div >
    )
}
