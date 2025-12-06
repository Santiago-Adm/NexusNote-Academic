import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import AppSidebar from '../components/Layout/AppSidebar'
import { cardVariants } from '../utils/animations'

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [workspaces, setWorkspaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false)
    const [newWorkspace, setNewWorkspace] = useState({
        name: '',
        description: '',
        icon: '📚',
        color: 'ocean' // Default to ID
    })
    const navigate = useNavigate()

    const iconOptions = ['📚', '📝', '💼', '🎯', '🔬', '🎨', '💻', '📊', '🌟', '🚀', '📖', '✏️']

    const GRADIENTS = [
        { id: 'ocean', name: 'Ocean', class: 'from-blue-400 to-blue-600', style: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
        { id: 'royal', name: 'Royal', class: 'from-purple-400 to-purple-600', style: 'linear-gradient(135deg, #c084fc, #9333ea)' },
        { id: 'nature', name: 'Nature', class: 'from-green-400 to-green-600', style: 'linear-gradient(135deg, #4ade80, #16a34a)' },
        { id: 'sunset', name: 'Sunset', class: 'from-orange-400 to-orange-600', style: 'linear-gradient(135deg, #fb923c, #ea580c)' },
        { id: 'berry', name: 'Berry', class: 'from-pink-400 to-pink-600', style: 'linear-gradient(135deg, #f472b6, #db2777)' },
        { id: 'teal', name: 'Teal', class: 'from-teal-400 to-teal-600', style: 'linear-gradient(135deg, #2dd4bf, #0d9488)' },
        { id: 'indigo', name: 'Indigo', class: 'from-indigo-400 to-indigo-600', style: 'linear-gradient(135deg, #818cf8, #4f46e5)' },
        { id: 'fire', name: 'Fire', class: 'from-red-400 to-red-600', style: 'linear-gradient(135deg, #f87171, #dc2626)' },
    ]

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                navigate('/login')
                return
            }

            setUser(session.user)
            await loadWorkspaces(session.user.id)
        } catch (error) {
            console.error('Error checking user:', error)
            navigate('/login')
        } finally {
            setLoading(false)
        }
    }

    const loadWorkspaces = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('workspaces')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (error) throw error
            setWorkspaces(data || [])
        } catch (error) {
            console.error('Error loading workspaces:', error)
        }
    }

    const handleCreateWorkspace = async () => {
        if (!newWorkspace.name.trim() || !user) return

        try {
            const { data, error } = await supabase
                .from('workspaces')
                .insert([
                    {
                        name: newWorkspace.name.trim(),
                        description: newWorkspace.description.trim(),
                        icon: newWorkspace.icon,
                        color: newWorkspace.color,
                        user_id: user.id
                    }
                ])
                .select()

            if (error) throw error

            setWorkspaces([data[0], ...workspaces])
            setNewWorkspace({ name: '', description: '', icon: '📚', color: 'ocean' })
            setShowNewWorkspaceModal(false)
        } catch (error) {
            console.error('Error creating workspace:', error)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
                <div className="text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <p style={{ color: '#6b7280' }}>Cargando...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen flex" style={{ backgroundColor: '#ffffff' }}>
                {/* Sidebar */}
                <AppSidebar user={user} workspaces={workspaces} />

                {/* Main Content */}
                <div className="flex-1 ml-48 overflow-auto" style={{ marginLeft: '12rem' }}>
                    {/* Header */}
                    <div className="border-b" style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                        <div className="px-4 py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>
                                        Mis Workspaces
                                    </h1>
                                    <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
                                        Organiza tus proyectos y notas académicas
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowNewWorkspaceModal(true)}
                                    className="px-6 py-3 rounded-lg font-semibold transition-all shadow-sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                                        color: 'white'
                                    }}
                                >
                                    + Nuevo Workspace
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8" style={{ backgroundColor: '#f9fafb', minHeight: 'calc(100vh - 120px)' }}>
                        {workspaces.length === 0 ? (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <div className="text-6xl mb-6">📚</div>
                                    <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a' }}>
                                        ¡Comienza tu viaje académico!
                                    </h2>
                                    <p className="text-base mb-8" style={{ color: '#6b7280', maxWidth: '400px' }}>
                                        Crea tu primer workspace para organizar tus notas, proyectos y tareas.
                                    </p>
                                    <button
                                        onClick={() => setShowNewWorkspaceModal(true)}
                                        className="px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                                            color: 'white'
                                        }}
                                    >
                                        + Crear mi primer Workspace
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            /* Workspaces Grid */
                            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
                                {/* New Workspace Card */}
                                <motion.div
                                    variants={cardVariants}
                                    onClick={() => setShowNewWorkspaceModal(true)}
                                    className="group relative flex flex-col items-center justify-center aspect-square bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-accent-cyan cursor-pointer transition-all shadow-sm hover:shadow-md"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-50 shadow-inner group-hover:bg-accent-cyan/10 flex items-center justify-center text-lg text-gray-400 group-hover:text-accent-cyan transition-colors mb-1">
                                        +
                                    </div>
                                    <h3 className="text-[11px] font-bold text-gray-500 group-hover:text-accent-cyan transition-colors text-center px-1">
                                        Crear
                                    </h3>
                                </motion.div>

                                {workspaces.map((workspace, index) => {
                                    // Find gradient by ID or class (backward compatibility) or fallback
                                    const gradient = GRADIENTS.find(g => g.id === workspace.color) ||
                                        GRADIENTS.find(g => g.class === workspace.color) ||
                                        GRADIENTS[index % GRADIENTS.length];

                                    return (
                                        <motion.div
                                            key={workspace.id}
                                            variants={cardVariants}
                                            onClick={() => navigate(`/workspace/${workspace.id}`)}
                                            className="group relative aspect-square rounded-xl p-3 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden text-white"
                                            style={{ background: gradient.style }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            {/* Header: Icon Top-Right */}
                                            <div className="flex justify-between items-start">
                                                <div className="w-full pr-4">
                                                    <h3 className="text-xs font-extrabold line-clamp-2 leading-tight tracking-tight text-white drop-shadow-sm">
                                                        {workspace.name}
                                                    </h3>
                                                </div>
                                                <div className="absolute top-2 right-2 text-base opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md">
                                                    {workspace.icon || '📚'}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="flex-1 mt-1 mb-1 overflow-hidden">
                                                <p className="text-[10px] opacity-90 line-clamp-3 leading-tight font-medium text-white/90">
                                                    {workspace.description || 'Sin descripción'}
                                                </p>
                                            </div>

                                            {/* Footer: Metadata */}
                                            <div className="flex items-center justify-between text-[9px] font-bold opacity-80 uppercase tracking-wider border-t border-white/20 pt-1 mt-auto text-white/90">
                                                <span>Activo</span>
                                                <span>Hoy</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div >

            {/* New Workspace Modal - Outside main container for proper centering */}
            {
                createPortal(
                    showNewWorkspaceModal && (
                        <div
                            className="fixed inset-0 flex items-center justify-center p-4"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                zIndex: 9999,
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onClick={() => setShowNewWorkspaceModal(false)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="p-8 rounded-2xl shadow-2xl"
                                style={{
                                    backgroundColor: 'white',
                                    maxWidth: '600px',
                                    width: '100%',
                                    maxHeight: '90vh',
                                    overflowY: 'auto'
                                }}
                            >
                                <h2 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
                                    Crear Nuevo Workspace
                                </h2>
                                <p className="text-sm mb-8" style={{ color: '#6b7280' }}>
                                    Organiza tus proyectos académicos en un espacio dedicado
                                </p>

                                {/* Icon Selector */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold mb-3" style={{ color: '#4b5563' }}>
                                        Elige un icono
                                    </label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {iconOptions.map((icon) => (
                                            <button
                                                key={icon}
                                                onClick={() => setNewWorkspace({ ...newWorkspace, icon })}
                                                className="w-full aspect-square rounded-lg text-2xl transition-all"
                                                style={{
                                                    backgroundColor: newWorkspace.icon === icon ? '#e0f2f1' : '#f3f4f6',
                                                    border: newWorkspace.icon === icon ? '2px solid #2d7a8e' : '2px solid transparent'
                                                }}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Selector */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold mb-3" style={{ color: '#4b5563' }}>
                                        Elige un color
                                    </label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {GRADIENTS.map((gradient) => (
                                            <button
                                                key={gradient.id}
                                                onClick={() => setNewWorkspace({ ...newWorkspace, color: gradient.id })}
                                                className={`w-full h-12 rounded-lg transition-all ${newWorkspace.color === gradient.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'hover:scale-105'}`}
                                                style={{ background: gradient.style }}
                                                title={gradient.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Name Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#4b5563' }}>
                                        Nombre del Workspace *
                                    </label>
                                    <input
                                        type="text"
                                        value={newWorkspace.name}
                                        onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                                        onKeyPress={(e) => e.key === 'Enter' && handleCreateWorkspace()}
                                        placeholder="Ej: Matemáticas Avanzadas"
                                        className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors text-base"
                                        style={{
                                            borderColor: '#e5e7eb',
                                            color: '#1a1a1a'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2d7a8e'}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                </div>

                                {/* Description Input */}
                                <div className="mb-8">
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#4b5563' }}>
                                        Descripción (opcional)
                                    </label>
                                    <textarea
                                        value={newWorkspace.description}
                                        onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                                        placeholder="Describe brevemente este workspace..."
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors text-base resize-none"
                                        style={{
                                            borderColor: '#e5e7eb',
                                            color: '#1a1a1a'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2d7a8e'}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setShowNewWorkspaceModal(false)
                                            setNewWorkspace({ name: '', description: '', icon: '📚', color: 'ocean' })
                                        }}
                                        className="flex-1 px-6 py-3 rounded-lg font-semibold transition-colors"
                                        style={{
                                            backgroundColor: '#f3f4f6',
                                            color: '#6b7280'
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleCreateWorkspace}
                                        disabled={!newWorkspace.name.trim()}
                                        className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all"
                                        style={{
                                            background: newWorkspace.name.trim()
                                                ? 'linear-gradient(135deg, #2d7a8e, #4db8a3)'
                                                : '#e5e7eb',
                                            color: newWorkspace.name.trim() ? 'white' : '#9ca3af',
                                            cursor: newWorkspace.name.trim() ? 'pointer' : 'not-allowed'
                                        }}
                                    >
                                        Crear Workspace
                                    </button>
                                </div>
                            </div>
                        </div>
                    ),
                    document.body
                )
            }
        </>
    )
}
