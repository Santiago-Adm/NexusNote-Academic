import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AppSidebar({ user, workspaces = [] }) {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <div
            className="w-48 border-r flex flex-col transition-all duration-300"
            style={{
                borderRight: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 50
            }}
        >
            {/* Logo */}
            <div className="p-6 border-b" style={{ borderBottom: '1px solid #e5e7eb' }}>
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                            color: 'white'
                        }}
                    >
                        N
                    </div>
                    <div>
                        <div className="text-lg font-bold" style={{ color: '#1a1a1a' }}>
                            NexusNote
                        </div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>
                            Academic
                        </div>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b" style={{ borderBottom: '1px solid #e5e7eb' }}>
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #2d7a8e, #4db8a3)',
                            color: 'white'
                        }}
                    >
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#1a1a1a' }}>
                            {user?.email?.split('@')[0] || 'Usuario'}
                        </p>
                        <p className="text-xs truncate" style={{ color: '#6b7280' }}>
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{
                            backgroundColor: '#e0f2f1',
                            color: '#2d7a8e'
                        }}
                    >
                        <span>📚</span>
                        <span>Mis Workspaces</span>
                    </button>

                    {/* Workspace List in Sidebar */}
                    <div className="pl-4 mt-2 space-y-1">
                        {workspaces.map(ws => (
                            <button
                                key={ws.id}
                                onClick={() => navigate(`/workspace/${ws.id}`)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate"
                                style={{ color: '#6b7280' }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f3f4f6'
                                    e.target.style.color = '#1a1a1a'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent'
                                    e.target.style.color = '#6b7280'
                                }}
                            >
                                <span className="text-lg">{ws.icon}</span>
                                <span className="truncate">{ws.name}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-4"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <span>⭐</span>
                        <span>Favoritos</span>
                    </button>
                    <button
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <span>🗂️</span>
                        <span>Archivados</span>
                    </button>
                </div>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t" style={{ borderTop: '1px solid #e5e7eb' }}>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        color: '#6b7280'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#fee2e2'
                        e.target.style.color = '#dc2626'
                        e.target.style.borderColor = '#fecaca'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white'
                        e.target.style.color = '#6b7280'
                        e.target.style.borderColor = '#e5e7eb'
                    }}
                >
                    <span>🚪</span>
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </div>
    )
}
