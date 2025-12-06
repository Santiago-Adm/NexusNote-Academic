// Global keyboard shortcuts configuration

export const KEYBOARD_SHORTCUTS = {
    // Command Palette
    'Ctrl+K': {
        description: 'Abrir Command Palette',
        action: 'open-command-palette',
        global: true
    },
    'Cmd+K': {
        description: 'Abrir Command Palette',
        action: 'open-command-palette',
        global: true
    },

    // Workspace & Page
    'Ctrl+N': {
        description: 'Nuevo Workspace',
        action: 'new-workspace',
        global: true
    },
    'Ctrl+P': {
        description: 'Nueva Página',
        action: 'new-page',
        global: false
    },

    // Text Formatting (in text blocks)
    'Ctrl+B': {
        description: 'Negrita',
        action: 'format-bold',
        global: false,
        context: 'text-editor'
    },
    'Ctrl+I': {
        description: 'Cursiva',
        action: 'format-italic',
        global: false,
        context: 'text-editor'
    },

    // Block Actions
    'Ctrl+D': {
        description: 'Duplicar bloque',
        action: 'duplicate-block',
        global: false,
        context: 'block'
    },
    'Ctrl+ArrowUp': {
        description: 'Mover bloque arriba',
        action: 'move-block-up',
        global: false,
        context: 'block'
    },
    'Ctrl+ArrowDown': {
        description: 'Mover bloque abajo',
        action: 'move-block-down',
        global: false,
        context: 'block'
    },
    'Delete': {
        description: 'Eliminar bloque',
        action: 'delete-block',
        global: false,
        context: 'block'
    },

    // Navigation
    'Escape': {
        description: 'Cerrar modal/menú',
        action: 'close-modal',
        global: true
    },

    // Help
    'Ctrl+/': {
        description: 'Mostrar atajos de teclado',
        action: 'show-shortcuts',
        global: true
    },
    'Ctrl+?': {
        description: 'Mostrar atajos de teclado',
        action: 'show-shortcuts',
        global: true
    },

    // Undo/Redo (future)
    'Ctrl+Z': {
        description: 'Deshacer',
        action: 'undo',
        global: false,
        disabled: true
    },
    'Ctrl+Shift+Z': {
        description: 'Rehacer',
        action: 'redo',
        global: false,
        disabled: true
    },
}

// Slash commands for quick block insertion
export const SLASH_COMMANDS = [
    {
        icon: '📝',
        label: 'Texto',
        value: 'text',
        description: 'Bloque de texto con Markdown',
        keywords: ['texto', 'text', 'markdown', 'escribir']
    },
    {
        icon: '💻',
        label: 'Código',
        value: 'code',
        description: 'Bloque de código con syntax highlighting',
        keywords: ['código', 'code', 'programación', 'script']
    },
    {
        icon: '✅',
        label: 'Tareas',
        value: 'task',
        description: 'Lista de tareas con checkboxes',
        keywords: ['tareas', 'tasks', 'checklist', 'todo']
    },
    {
        icon: '🖼️',
        label: 'Imagen',
        value: 'image',
        description: 'Subir o insertar imagen',
        keywords: ['imagen', 'image', 'foto', 'picture'],
        disabled: true // Future feature
    },
    {
        icon: '📊',
        label: 'Tabla',
        value: 'table',
        description: 'Tabla de datos',
        keywords: ['tabla', 'table', 'datos', 'grid'],
        disabled: true // Future feature
    },
]

// Context menu options for blocks
export const BLOCK_CONTEXT_MENU = [
    {
        icon: '📋',
        label: 'Duplicar',
        action: 'duplicate',
        shortcut: 'Ctrl+D'
    },
    {
        icon: '⬆️',
        label: 'Mover arriba',
        action: 'move-up',
        shortcut: 'Ctrl+↑'
    },
    {
        icon: '⬇️',
        label: 'Mover abajo',
        action: 'move-down',
        shortcut: 'Ctrl+↓'
    },
    {
        icon: '🔄',
        label: 'Cambiar tipo',
        action: 'change-type',
        shortcut: null,
        disabled: true // Future feature
    },
    {
        icon: '🗑️',
        label: 'Eliminar',
        action: 'delete',
        shortcut: 'Del',
        danger: true
    },
]
