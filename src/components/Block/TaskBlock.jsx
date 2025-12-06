import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { slideDown } from '../../utils/animations'

const STATUS_OPTIONS = {
    'Not Started': { color: 'bg-blue-500', label: 'Not Started' },
    'In Progress': { color: 'bg-gray-500', label: 'In Progress' },
    'Waiting': { color: 'bg-orange-400', label: 'Waiting' },
    'Done': { color: 'bg-emerald-500', label: 'Done' },
    'Deferred': { color: 'bg-red-500', label: 'Deferred' }
}

const PRIORITY_OPTIONS = {
    'High': { color: 'bg-red-500', label: 'High' },
    'Medium': { color: 'bg-yellow-400', label: 'Medium' },
    'Low': { color: 'bg-green-500', label: 'Low' }
}

export default function TaskBlock({ content, onChange, readOnly = false }) {
    const [tasks, setTasks] = useState(content?.tasks || [])

    useEffect(() => {
        setTasks(content?.tasks || [])
    }, [content])

    const updateTask = (taskId, field, value) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, [field]: value } : task
        )
        setTasks(updatedTasks)
        onChange({ tasks: updatedTasks })
    }

    const handleAddTask = () => {
        const newTask = {
            id: uuidv4(),
            text: '',
            completed: false,
            status: 'Not Started',
            priority: 'Medium',
            dueDate: '',
            approved: false
        }
        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks)
        onChange({ tasks: updatedTasks })
    }

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
        onChange({ tasks: updatedTasks })
    }

    const cycleStatus = (taskId, currentStatus) => {
        const keys = Object.keys(STATUS_OPTIONS)
        // Default to 'Not Started' if currentStatus is invalid/undefined
        const safeStatus = STATUS_OPTIONS[currentStatus] ? currentStatus : 'Not Started'
        const currentIndex = keys.indexOf(safeStatus)
        const nextIndex = (currentIndex + 1) % keys.length
        updateTask(taskId, 'status', keys[nextIndex])
    }

    const cyclePriority = (taskId, currentPriority) => {
        const keys = Object.keys(PRIORITY_OPTIONS)
        // Default to 'Medium' if currentPriority is invalid/undefined
        const safePriority = PRIORITY_OPTIONS[currentPriority] ? currentPriority : 'Medium'
        const currentIndex = keys.indexOf(safePriority)
        const nextIndex = (currentIndex + 1) % keys.length
        updateTask(taskId, 'priority', keys[nextIndex])
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
                <thead>
                    <tr className="border-b border-gray-200/50">
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider w-[40%]">Task Name</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">Due Date</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">Status</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">Priority</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider w-[10%]">Approved?</th>
                        <th className="w-[5%]"></th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.tr
                                key={task.id}
                                variants={slideDown}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, x: -20 }}
                                className="group border-b border-gray-100/30 hover:bg-white/40 transition-colors"
                            >
                                {/* Task Name */}
                                <td className="py-3 px-2">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateTask(task.id, 'completed', !task.completed)}
                                            className={`
                                                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shadow-sm
                                                ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-500 bg-white'}
                                            `}
                                        >
                                            {task.completed && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                        <input
                                            type="text"
                                            value={task.text}
                                            onChange={(e) => updateTask(task.id, 'text', e.target.value)}
                                            placeholder="Task description..."
                                            className={`w-full bg-transparent border-none focus:outline-none text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}
                                        />
                                    </div>
                                </td>

                                {/* Due Date */}
                                <td className="py-3 px-2">
                                    <input
                                        type="text"
                                        value={task.dueDate || ''}
                                        onChange={(e) => updateTask(task.id, 'dueDate', e.target.value)}
                                        placeholder="Add date"
                                        className={`w-full bg-transparent border-none focus:outline-none text-xs ${task.dueDate ? 'text-teal-600 font-bold' : 'text-gray-400'}`}
                                    />
                                </td>

                                {/* Status */}
                                <td className="py-3 px-2 text-center">
                                    <button
                                        onClick={() => cycleStatus(task.id, task.status)}
                                        className={`
                                            px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide shadow-md transition-all hover:scale-105 hover:shadow-lg
                                            ${STATUS_OPTIONS[task.status]?.color || STATUS_OPTIONS['Not Started'].color}
                                        `}
                                    >
                                        {STATUS_OPTIONS[task.status]?.label || 'Not Started'}
                                    </button>
                                </td>

                                {/* Priority */}
                                <td className="py-3 px-2 text-center">
                                    <button
                                        onClick={() => cyclePriority(task.id, task.priority)}
                                        className={`
                                            px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide shadow-md transition-all hover:scale-105 hover:shadow-lg
                                            ${PRIORITY_OPTIONS[task.priority]?.color || PRIORITY_OPTIONS['Medium'].color}
                                        `}
                                    >
                                        {PRIORITY_OPTIONS[task.priority]?.label || 'Medium'}
                                    </button>
                                </td>

                                {/* Approved */}
                                <td className="py-3 px-2 text-center">
                                    <button
                                        onClick={() => updateTask(task.id, 'approved', !task.approved)}
                                        className={`
                                            px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide shadow-md transition-all hover:scale-105 hover:shadow-lg
                                            ${task.approved ? 'bg-emerald-500' : 'bg-pink-500'}
                                        `}
                                    >
                                        {task.approved ? 'Yes' : 'No'}
                                    </button>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-2 text-center">
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>

            <motion.button
                onClick={handleAddTask}
                className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-accent-cyan border border-dashed border-gray-300 hover:border-accent-cyan rounded-xl transition-all hover:bg-white/50"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <span>+</span> Add New Task
            </motion.button>
        </div>
    )
}
