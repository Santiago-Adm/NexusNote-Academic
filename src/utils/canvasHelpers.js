/**
 * Canvas Helper Functions
 * Utilities for drawing grids, shapes, and managing canvas state
 */

/**
 * Draw grid background on canvas
 */
export const drawGrid = (ctx, type, width, height, color = 'rgba(45, 122, 142, 0.2)') => {
    ctx.save()
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = 0.5

    if (type === 'dots') {
        // Draw dots every 20px
        for (let x = 0; x < width; x += 20) {
            for (let y = 0; y < height; y += 20) {
                ctx.fillRect(x, y, 2, 2)
            }
        }
    } else if (type === 'squares') {
        // Draw grid lines every 20px
        for (let x = 0; x <= width; x += 20) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
        }
        for (let y = 0; y <= height; y += 20) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }
    } else if (type === 'lines') {
        // Draw horizontal lines every 30px
        for (let y = 0; y <= height; y += 30) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }
    }

    ctx.restore()
}

/**
 * Get canvas data as base64 PNG
 */
export const getCanvasData = (canvas) => {
    return canvas.toDataURL('image/png')
}

/**
 * Load canvas data from base64 PNG
 */
export const loadCanvasData = (canvas, dataURL, callback) => {
    if (!dataURL) return

    const img = new Image()
    img.onload = () => {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        if (callback) callback()
    }
    img.src = dataURL
}

/**
 * Draw rectangle shape
 */
export const drawRectangle = (ctx, startX, startY, endX, endY, color, lineWidth) => {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.strokeRect(startX, startY, endX - startX, endY - startY)
}

/**
 * Draw filled rectangle
 */
export const drawFilledRectangle = (ctx, startX, startY, endX, endY, color) => {
    ctx.fillStyle = color
    ctx.fillRect(startX, startY, endX - startX, endY - startY)
}

/**
 * Draw circle shape
 */
export const drawCircle = (ctx, startX, startY, endX, endY, color, lineWidth) => {
    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI)
    ctx.stroke()
}

/**
 * Draw arrow
 */
export const drawArrow = (ctx, startX, startY, endX, endY, color, lineWidth) => {
    const headLength = 15
    const angle = Math.atan2(endY - startY, endX - startX)

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = lineWidth

    // Draw line
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    // Draw arrowhead
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
        endX - headLength * Math.cos(angle - Math.PI / 6),
        endY - headLength * Math.sin(angle - Math.PI / 6)
    )
    ctx.lineTo(
        endX - headLength * Math.cos(angle + Math.PI / 6),
        endY - headLength * Math.sin(angle + Math.PI / 6)
    )
    ctx.closePath()
    ctx.fill()
}

/**
 * Draw line
 */
export const drawLine = (ctx, startX, startY, endX, endY, color, lineWidth) => {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
}

/**
 * Snap coordinate to grid
 */
export const snapToGrid = (value, gridSize = 20) => {
    return Math.round(value / gridSize) * gridSize
}

/**
 * Clear canvas
 */
export const clearCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * Export canvas as PNG file
 */
export const exportCanvasToPNG = (canvas, filename = 'canvas-export.png') => {
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    link.click()
}
