import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    drawGrid,
    getCanvasData,
    loadCanvasData,
    drawRectangle,
    drawCircle,
    drawArrow,
    drawLine,
    snapToGrid,
    clearCanvas,
    exportCanvasToPNG,
} from '../../utils/canvasHelpers'
import { slideDown } from '../../utils/animations'

const COLORS = ['#4db8a3', '#2d7a8e', '#3a9299', '#1a4d6f', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6']
const LINE_WIDTHS = [1, 3, 5, 8]
const GRID_TYPES = ['none', 'dots', 'squares', 'lines']

export default function CanvasBlock({ content, onChange, readOnly = false }) {
    const canvasRef = useRef(null)
    const [ctx, setCtx] = useState(null)
    const [tool, setTool] = useState('pencil')
    const [color, setColor] = useState('#4db8a3')
    const [lineWidth, setLineWidth] = useState(3)
    const [gridType, setGridType] = useState(content?.gridType || 'dots')
    const [isDrawing, setIsDrawing] = useState(false)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })
    const [history, setHistory] = useState([])
    const [historyStep, setHistoryStep] = useState(-1)
    const [snapToGridEnabled, setSnapToGridEnabled] = useState(false)
    const [zoom, setZoom] = useState(1)
    const [isSaving, setIsSaving] = useState(false)

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        setCtx(context)

        // Set canvas size
        canvas.width = content?.width || 800
        canvas.height = content?.height || 600

        // Load saved data
        if (content?.dataURL) {
            loadCanvasData(canvas, content.dataURL, () => {
                saveToHistory()
            })
        } else {
            // Draw initial grid
            redrawCanvas(context)
            saveToHistory()
        }
    }, [])

    // Redraw canvas with grid
    const redrawCanvas = (context = ctx) => {
        if (!context || !canvasRef.current) return

        const canvas = canvasRef.current
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        context.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid(context, gridType, canvas.width, canvas.height)

        context.putImageData(imageData, 0, 0)
    }

    // Auto-save every 5 seconds
    useEffect(() => {
        if (!canvasRef.current || historyStep < 0) return

        const timer = setInterval(() => {
            saveCanvas()
        }, 5000)

        return () => clearInterval(timer)
    }, [historyStep, gridType])

    const saveCanvas = async () => {
        if (!canvasRef.current) return

        setIsSaving(true)
        const canvasData = getCanvasData(canvasRef.current)

        await onChange({
            dataURL: canvasData,
            gridType: gridType,
            width: canvasRef.current.width,
            height: canvasRef.current.height,
        })

        setTimeout(() => setIsSaving(false), 500)
    }

    const saveToHistory = () => {
        if (!canvasRef.current) return

        const canvasData = getCanvasData(canvasRef.current)
        const newHistory = history.slice(0, historyStep + 1)
        setHistory([...newHistory, canvasData])
        setHistoryStep(historyStep + 1)
    }

    const undo = () => {
        if (historyStep > 0 && canvasRef.current) {
            setHistoryStep(historyStep - 1)
            loadCanvasData(canvasRef.current, history[historyStep - 1])
        }
    }

    const redo = () => {
        if (historyStep < history.length - 1 && canvasRef.current) {
            setHistoryStep(historyStep + 1)
            loadCanvasData(canvasRef.current, history[historyStep + 1])
        }
    }

    const getMousePos = (e) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        let x = (e.clientX - rect.left) / zoom
        let y = (e.clientY - rect.top) / zoom

        if (snapToGridEnabled && (tool === 'rectangle' || tool === 'circle')) {
            x = snapToGrid(x)
            y = snapToGrid(y)
        }

        return { x, y }
    }

    const startDrawing = (e) => {
        if (readOnly) return

        setIsDrawing(true)
        const pos = getMousePos(e)
        setStartPos(pos)

        if (tool === 'pencil' || tool === 'marker' || tool === 'eraser') {
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        }
    }

    const draw = (e) => {
        if (!isDrawing || readOnly) return

        const pos = getMousePos(e)

        if (tool === 'pencil' || tool === 'marker') {
            ctx.lineTo(pos.x, pos.y)
            ctx.strokeStyle = color
            ctx.lineWidth = tool === 'marker' ? lineWidth * 2 : lineWidth
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()
        } else if (tool === 'eraser') {
            ctx.clearRect(pos.x - lineWidth / 2, pos.y - lineWidth / 2, lineWidth * 2, lineWidth * 2)
        }
    }

    const stopDrawing = (e) => {
        if (!isDrawing || readOnly) return

        const pos = getMousePos(e)

        // Draw shapes
        if (tool === 'rectangle') {
            drawRectangle(ctx, startPos.x, startPos.y, pos.x, pos.y, color, lineWidth)
        } else if (tool === 'circle') {
            drawCircle(ctx, startPos.x, startPos.y, pos.x, pos.y, color, lineWidth)
        } else if (tool === 'arrow') {
            drawArrow(ctx, startPos.x, startPos.y, pos.x, pos.y, color, lineWidth)
        } else if (tool === 'line') {
            drawLine(ctx, startPos.x, startPos.y, pos.x, pos.y, color, lineWidth)
        }

        setIsDrawing(false)
        saveToHistory()
    }

    const handleClear = () => {
        if (!canvasRef.current || readOnly) return
        if (!confirm('¿Estás seguro de borrar todo el canvas?')) return

        clearCanvas(canvasRef.current)
        redrawCanvas()
        saveToHistory()
    }

    const handleExport = () => {
        if (!canvasRef.current) return
        exportCanvasToPNG(canvasRef.current, `canvas-${Date.now()}.png`)
    }

    const handleGridChange = (newGridType) => {
        setGridType(newGridType)
        redrawCanvas()
    }

    const getCursorStyle = () => {
        switch (tool) {
            case 'pencil':
                return 'crosshair'
            case 'marker':
                return 'crosshair'
            case 'eraser':
                return 'not-allowed'
            case 'text':
                return 'text'
            default:
                return 'crosshair'
        }
    }

    return (
        <div className="relative group rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-inner">
            {/* Floating Toolbar Palette */}
            <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 ring-1 ring-black/5"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                {/* Tools Group */}
                <div className="flex items-center gap-1 pr-3 border-r border-gray-200">
                    <ToolButton icon="🖊️" active={tool === 'pencil'} onClick={() => setTool('pencil')} />
                    <ToolButton icon="✏️" active={tool === 'marker'} onClick={() => setTool('marker')} />
                    <ToolButton icon="⬜" active={tool === 'rectangle'} onClick={() => setTool('rectangle')} />
                    <ToolButton icon="⭕" active={tool === 'circle'} onClick={() => setTool('circle')} />
                    <ToolButton icon="➡️" active={tool === 'arrow'} onClick={() => setTool('arrow')} />
                    <ToolButton icon="📏" active={tool === 'line'} onClick={() => setTool('line')} />
                    <ToolButton icon="🗑️" active={tool === 'eraser'} onClick={() => setTool('eraser')} />
                </div>

                {/* Properties Group */}
                <div className="flex items-center gap-3 px-3 border-r border-gray-200">
                    {/* Color Picker */}
                    <div className="flex items-center -space-x-1.5 hover:space-x-1 transition-all duration-300">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                className={`w-5 h-5 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-125 hover:z-10 ${color === c ? 'scale-125 z-10 ring-2 ring-offset-1 ring-gray-200' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>

                    {/* Line Width */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                        {[1, 3, 5, 8].map((w) => (
                            <button
                                key={w}
                                onClick={() => setLineWidth(w)}
                                className={`w-6 h-6 flex items-center justify-center rounded-md transition-all ${lineWidth === w ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                            >
                                <div className="bg-gray-800 rounded-full" style={{ width: w + 2, height: w + 2 }} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions Group */}
                <div className="flex items-center gap-1 pl-1">
                    <ActionButton onClick={undo} disabled={historyStep <= 0} icon="↩️" />
                    <ActionButton onClick={redo} disabled={historyStep >= history.length - 1} icon="↪️" />
                    <div className="w-px h-4 bg-gray-200 mx-1" />
                    <ActionButton onClick={handleClear} icon="🗑️" danger />
                    <ActionButton onClick={handleExport} icon="📥" />
                </div>
            </motion.div>

            {/* Canvas Area */}
            <div className="relative w-full bg-white cursor-crosshair">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                        backgroundImage: gridType === 'dots' ? 'radial-gradient(#cbd5e1 1px, transparent 1px)' : 'none',
                        backgroundSize: '20px 20px'
                    }}
                />

                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-auto block touch-none"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                    }}
                />
            </div>

            {/* Status Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 px-4 py-2 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <div className="flex gap-4">
                    <span>TOOL: {tool.toUpperCase()}</span>
                    <span>SIZE: {canvasRef.current?.width}x{canvasRef.current?.height}</span>
                </div>
                {isSaving && (
                    <span className="flex items-center gap-1 text-accent-cyan">
                        <span className="animate-spin">⟳</span> SAVING
                    </span>
                )}
            </div>
        </div>
    )
}

function ToolButton({ icon, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-200
                ${active
                    ? 'bg-gradient-to-br from-accent-cyan to-teal-600 text-white shadow-md scale-105'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                }
            `}
        >
            {icon}
        </button>
    )
}

function ActionButton({ onClick, disabled, icon, danger }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 active:scale-95'}
                ${danger ? 'hover:bg-red-50 text-red-400' : 'text-gray-500'}
            `}
        >
            {icon}
        </button>
    )
}
