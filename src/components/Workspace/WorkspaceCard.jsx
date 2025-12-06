import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function WorkspaceCard({ workspace, onEdit, onDelete, index = 0 }) {
    const navigate = useNavigate()
    const pageCount = workspace.pages?.[0]?.count || 0

    const handleEdit = (e) => {
        e.stopPropagation()
        onEdit(workspace)
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(workspace)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(45, 122, 142, 0.15)' }}
            onClick={() => navigate(`/workspace/${workspace.id}`)}
            className="bg-white rounded-xl border-2 border-gray-200 hover:border-accent-cyan p-6 cursor-pointer transition-all group shadow-sm hover:shadow-md"
        >
            {/* Icon with gradient background */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent-cyan to-highlight flex items-center justify-center text-3xl mb-4 shadow-sm">
                {workspace.icon || '📚'}
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-accent-cyan transition-colors">
                {workspace.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                {workspace.description || 'Sin descripción'}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                {/* Page Count Badge */}
                <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-medium rounded-full">
                    📄 {pageCount} {pageCount === 1 ? 'página' : 'páginas'}
                </span>

                {/* Actions (visible on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <motion.button
                        onClick={handleEdit}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Editar"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={handleDelete}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors"
                        title="Eliminar"
                    >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}
