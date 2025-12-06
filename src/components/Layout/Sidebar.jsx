import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        localStorage.removeItem('supabase_session')
        navigate('/login')
    }

    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Notas', icon: '📝', path: '/notes' },
        { name: 'Proyectos', icon: '📁', path: '/projects' },
        { name: 'Calendario', icon: '📅', path: '/calendar' },
        { name: 'Configuración', icon: '⚙️', path: '/settings' },
    ]

    return (
        <aside className="w-64 bg-bg-sidebar text-white h-screen fixed left-0 top-0 border-r border-white/10 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold text-white">NexusNote</h1>
                <p className="text-sm text-gray-400 mt-1">Academic</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <motion.button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${isActive
                                    ? 'bg-accent-cyan/20 text-white border-l-2 border-highlight'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            whileHover={{ x: isActive ? 0 : 4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {item.name}
                            </span>
                        </motion.button>
                    )
                })}
            </nav>

            {/* User / Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                    <span className="text-xl">🚪</span>
                    <span className="text-sm font-medium">Cerrar sesión</span>
                </button>
            </div>
        </aside>
    )
}
