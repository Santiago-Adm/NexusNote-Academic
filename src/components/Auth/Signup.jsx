import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) throw error

            setSuccess(true)

            if (data.session) {
                localStorage.setItem('supabase_session', JSON.stringify(data.session))
                setTimeout(() => navigate('/dashboard'), 2000)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-bg-secondary to-accent-cyan p-8 w-full max-w-md shadow-2xl shadow-accent-blue/20 rounded-lg">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-bg-primary via-accent-blue to-accent-teal bg-clip-text text-transparent mb-2">
                        NexusNote Academic
                    </h1>
                    <p className="text-accent-cyan">Crea tu cuenta</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-accent-teal mb-2">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-bg-secondary border-2 border-accent-cyan rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-highlight transition-all duration-300"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-accent-teal mb-2">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-bg-secondary border-2 border-accent-cyan rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-highlight transition-all duration-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-accent-teal mb-2">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-bg-secondary border-2 border-accent-cyan rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-highlight transition-all duration-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-highlight/10 border border-highlight text-highlight px-4 py-3 rounded-lg">
                            ¡Cuenta creada exitosamente! Redirigiendo...
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-bg-primary via-accent-blue to-accent-teal text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:brightness-110 shadow-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        ¿Ya tienes cuenta?{' '}
                        <a href="/login" className="text-highlight hover:text-accent-teal transition-colors duration-300">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
