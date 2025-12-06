import { motion } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function BlockContainer({ block, onUpdate, onDelete, onDuplicate, children, index = 0 }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const getBlockColor = (type) => {
        switch (type) {
            case 'text': return {
                border: 'border-orange-500',
                borderSubtle: 'border-orange-200',
                bg: 'bg-orange-500',
                bgTint: 'bg-orange-50/50',
                headerTint: 'bg-orange-50',
                text: 'text-orange-600',
                gradient: 'from-orange-400 to-orange-600',
                shadow: 'hover:shadow-orange-500/20'
            }
            case 'code': return {
                border: 'border-blue-500',
                borderSubtle: 'border-blue-200',
                bg: 'bg-blue-500',
                bgTint: 'bg-blue-50/50',
                headerTint: 'bg-blue-50',
                text: 'text-blue-600',
                gradient: 'from-blue-400 to-blue-600',
                shadow: 'hover:shadow-blue-500/20'
            }
            case 'task': return {
                border: 'border-green-500',
                borderSubtle: 'border-green-200',
                bg: 'bg-green-500',
                bgTint: 'bg-green-50/50',
                headerTint: 'bg-green-50',
                text: 'text-green-600',
                gradient: 'from-green-400 to-green-600',
                shadow: 'hover:shadow-green-500/20'
            }
            case 'canvas': return {
                border: 'border-purple-500',
                borderSubtle: 'border-purple-200',
                bg: 'bg-purple-500',
                bgTint: 'bg-purple-50/50',
                headerTint: 'bg-purple-50',
                text: 'text-purple-600',
                gradient: 'from-purple-400 to-purple-600',
                shadow: 'hover:shadow-purple-500/20'
            }
            case 'image': return {
                border: 'border-pink-500',
                borderSubtle: 'border-pink-200',
                bg: 'bg-pink-500',
                bgTint: 'bg-pink-50/50',
                headerTint: 'bg-pink-50',
                text: 'text-pink-600',
                gradient: 'from-pink-400 to-pink-600',
                shadow: 'hover:shadow-pink-500/20'
            }
            case 'pdf': return {
                border: 'border-red-500',
                borderSubtle: 'border-red-200',
                bg: 'bg-red-500',
                bgTint: 'bg-red-50/50',
                headerTint: 'bg-red-50',
                text: 'text-red-600',
                gradient: 'from-red-400 to-red-600',
                shadow: 'hover:shadow-red-500/20'
            }
            default: return {
                border: 'border-gray-400',
                borderSubtle: 'border-gray-200',
                bg: 'bg-gray-400',
                bgTint: 'bg-gray-50/50',
                headerTint: 'bg-gray-50',
                text: 'text-gray-600',
                gradient: 'from-gray-400 to-gray-600',
                shadow: 'hover:shadow-gray-500/20'
            }
        }
    }

    const colors = getBlockColor(block.type)

    return (
        <motion.div
            ref={setNodeRef}
            style={{
                ...style,
                cursor: isDragging ? 'grabbing' : 'default',
            }}
            className={`
                group relative rounded-2xl p-6 mb-20
                ${colors.bgGradient}
                border-l-[10px] ${colors.border}
                border-t border-r border-b ${colors.borderSubtle}
                shadow-lg ${colors.glow}
                hover:shadow-2xl ${colors.shadow}
                transition-all duration-500 ease-out
                ${isDragging ? 'shadow-2xl opacity-90 scale-[1.02] z-50 ring-2 ring-accent-cyan' : ''}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
        >
            {/* Drag Handle (visible on hover) */}
            <div className="absolute -left-12 top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    {...attributes}
                    {...listeners}
                    className={`
                        p-2 rounded-full bg-white shadow-md border border-gray-100
                        cursor-grab active:cursor-grabbing text-gray-400 hover:text-${colors.text.replace('text-', '')} 
                        transition-all hover:scale-110 touch-none
                    `}
                    title="Arrastrar para reordenar"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                    </svg>
                </button>
            </div>

            {/* Glass Header */}
            <div className={`
                flex items-center justify-between mb-6 pb-4 
                border-b ${colors.borderSubtle} 
                ${colors.headerGlass} 
                -mx-6 -mt-6 px-6 pt-6 rounded-t-2xl
                transition-colors duration-300
            `}>
                {/* Block Type */}
                <div className="flex items-center gap-3">
                    <div
                        className={`
                            w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg 
                            bg-gradient-to-br ${colors.gradient} ring-2 ring-white/50
                        `}
                    >
                        {block.type === 'text' && 'T'}
                        {block.type === 'code' && 'C'}
                        {block.type === 'task' && '✓'}
                        {block.type === 'canvas' && '🎨'}
                        {block.type === 'image' && '🖼️'}
                        {block.type === 'pdf' && '📄'}
                    </div>
                    <span className={`text-xs font-extrabold uppercase tracking-widest ${colors.text}`}>
                        {block.type === 'text' && 'Texto'}
                        {block.type === 'code' && 'Código'}
                        {block.type === 'task' && 'Tareas'}
                        {block.type === 'canvas' && 'Canvas'}
                        {block.type === 'image' && 'Imagen'}
                        {block.type === 'pdf' && 'PDF'}
                    </span>
                </div>

                {/* Actions (visible on hover) */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    {onDuplicate && (
                        <button
                            onClick={() => onDuplicate(block)}
                            className="p-2 rounded-lg hover:bg-white/80 text-gray-400 hover:text-gray-700 transition-all hover:shadow-sm"
                            title="Duplicar"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(block.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all hover:shadow-sm"
                        title="Eliminar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Block Content */}
            <div className="text-gray-900 relative z-10">
                {children}
            </div>

            {/* Vivid Separator */}
            <div className={`
                absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 
                h-1.5 rounded-full 
                bg-gradient-to-r from-transparent via-${colors.border.replace('border-', '')}/40 to-transparent
                blur-sm
            `} />
        </motion.div>
    )
}
