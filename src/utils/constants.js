// Grid types for page backgrounds
export const GRID_TYPES = [
    { value: 'none', label: 'Sin cuadrícula', icon: '⬜' },
    { value: 'dots', label: 'Puntos', icon: '📐' },
    { value: 'squares', label: 'Cuadrícula', icon: '⊞' },
    { value: 'lines', label: 'Líneas', icon: '═' },
]

// Block types for content
export const BLOCK_TYPES = [
    { value: 'text', label: 'Texto', icon: '📝', description: 'Texto con formato Markdown' },
    { value: 'code', label: 'Código', icon: '💻', description: 'Bloque de código con syntax highlighting' },
    { value: 'task', label: 'Tareas', icon: '✅', description: 'Lista de tareas con checkboxes' },
    { value: 'canvas', label: 'Canvas', icon: '🎨', description: 'Dibujo y anotaciones visuales' },
    { value: 'image', label: 'Imagen', icon: '🖼️', description: 'Subir y mostrar imágenes' },
    { value: 'pdf', label: 'PDF', icon: '📄', description: 'Subir y visualizar documentos PDF' },
]

// Programming languages for code blocks
export const CODE_LANGUAGES = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'bash', label: 'Bash' },
    { value: 'plaintext', label: 'Texto plano' },
]

// Workspace emojis (already defined)
export const WORKSPACE_EMOJIS = [
    { emoji: '📚', label: 'Libros' },
    { emoji: '📝', label: 'Notas' },
    { emoji: '💼', label: 'Trabajo' },
    { emoji: '🎯', label: 'Objetivos' },
    { emoji: '💡', label: 'Ideas' },
    { emoji: '🔬', label: 'Ciencia' },
    { emoji: '🎨', label: 'Arte' },
    { emoji: '⚡', label: 'Energía' },
    { emoji: '🌟', label: 'Destacado' },
    { emoji: '🔧', label: 'Herramientas' },
    { emoji: '📊', label: 'Datos' },
    { emoji: '🎓', label: 'Educación' },
]

// Workspace colors (already defined)
export const WORKSPACE_COLORS = [
    { color: '#2d7a8e', label: 'Cyan' },
    { color: '#3a9299', label: 'Teal' },
    { color: '#4db8a3', label: 'Highlight' },
    { color: '#1a4d6f', label: 'Blue' },
    { color: '#5c4db8', label: 'Purple' },
    { color: '#b84d8e', label: 'Pink' },
]
