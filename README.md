# 🎓 NexusNote Academic - Sistema de Notas Premium

## 📋 Descripción del Proyecto

NexusNote Academic es una aplicación web moderna de gestión de notas académicas con características premium, animaciones fluidas, y una experiencia de usuario excepcional. Construida con React, Vite, Supabase, y Framer Motion.

---

## ✨ Características Principales

### 🎨 **Sistema de Animaciones Premium (Phases 1-7)**

#### **Phase 1: Foundation**
- ✅ Framer Motion integrado
- ✅ React Hot Toast para notificaciones
- ✅ Heroicons para iconografía
- ✅ Fuse.js para búsqueda fuzzy
- ✅ 35+ variantes de animación reutilizables
- ✅ Hook de accesibilidad (reduced motion)
- ✅ Skeleton loaders con shimmer effect

#### **Phase 2: Core Components**
- ✅ WorkspaceCard con hover/tap effects
- ✅ WorkspaceModal con glassmorphism
- ✅ Dashboard con stagger grid animations
- ✅ BlockContainer con drag & drop animations

#### **Phase 2.5: Premium Interactions**
- ✅ **Command Palette** (Ctrl+K): Búsqueda fuzzy de comandos
- ✅ **Shortcuts Modal** (Ctrl+/): Cheatsheet de atajos
- ✅ **Context Menu**: Click derecho en bloques
- ✅ **15+ Keyboard Shortcuts** globales

#### **Phase 3: Block Types**
- ✅ **TextBlock**: Markdown, focus glow, auto-save
- ✅ **CodeBlock**: Syntax highlighting, 18 lenguajes
- ✅ **TaskBlock**: Checkboxes animados, progress bar, sparkles

#### **Phase 4: Editor & Navigation**
- ✅ **PageEditor**: Header slideDown, floating button
- ✅ **WorkspaceDetail**: Stagger pages grid
- ✅ **Sidebar**: Hover slideRight, active indicator animado

#### **Phase 5: Micro-interactions**
- ✅ **AnimatedButton**: Hover/tap, loading states
- ✅ **AnimatedInput**: Focus glow, error shake, success checkmark
- ✅ **Enhanced Drag & Drop**: Shadows, rotation, cursor states

#### **Phase 6: Polish & Effects**
- ✅ **GlassModal**: Blur 20px, gradient overlay
- ✅ **GlassCard**: Shine effect on hover
- ✅ **GlassDropdown**: Smooth animations
- ✅ **GridBackground**: FadeIn animation

#### **Phase 7: Optional Enhancements**
- ✅ **Confetti**: Al crear primer workspace (50 partículas)
- ✅ **Sparkles**: Al completar todas las tareas (30 estrellas)
- ✅ **Page Transitions**: 5 tipos diferentes
- ✅ **LoadingBar**: Barra de progreso animada

---

### 📝 **Tipos de Bloques**

#### **1. Text Block (📝)**
- Editor Markdown
- Preview en tiempo real
- Auto-save cada 2 segundos
- Focus glow animation
- Toolbar con formato

#### **2. Code Block (💻)**
- Syntax highlighting
- 18 lenguajes soportados
- Selector de lenguaje animado
- Auto-save indicator
- Números de línea

#### **3. Task Block (✅)**
- Checkboxes animados
- Progress bar con spring physics
- Sparkles al completar todas
- Add/delete con slide animations
- Contador de completadas

#### **4. Canvas Block (🎨)**
- **7 herramientas de dibujo**:
  - 🖊️ Lápiz (dibujo libre)
  - ✏️ Marcador (línea gruesa)
  - ⬜ Rectángulo
  - ⭕ Círculo
  - ➡️ Flecha
  - 📏 Línea
  - 🗑️ Borrador
- **Color picker**: 8 colores
- **Grosor**: 4 opciones (1px - 8px)
- **Grid backgrounds**: 4 tipos (none, dots, squares, lines)
- **Undo/Redo**: Ilimitado
- **Auto-save**: Cada 5 segundos
- **Export**: Descarga como PNG
- **Canvas**: 800x600px (redimensionable)

#### **5. Image Block (🖼️)**
- **Upload de imágenes**: JPG, PNG, GIF, WebP
- **Tamaño máximo**: 5MB
- **Preview responsive**: Max-height 96
- **Caption editable**
- **Fullscreen view**: Modal con blur
- **Lazy loading**: Optimización
- **Controles**: Overlay on hover
- **Almacenamiento**: Supabase Storage

#### **6. PDF Block (📄)**
- **Upload de PDFs**: Máximo 10MB
- **Preview**: Iframe integrado
- **Título editable**
- **Descarga**: Botón directo
- **Info**: Tamaño formateado
- **Almacenamiento**: Supabase Storage

---

### 🎨 **Sistema de Diseño**

#### **Paleta de Colores Personalizada**
```css
--bg-primary: #0a1628
--bg-secondary: #0d2137
--accent-blue: #1a4d6f
--accent-cyan: #2d7a8e
--accent-teal: #3a9299
--highlight: #4db8a3
```

#### **Gradientes**
```css
--gradient-main: linear-gradient(135deg, #0a1628 0%, #1a4d6f 50%, #3a9299 100%)
--gradient-card: linear-gradient(145deg, #0d2137, #2d7a8e)
```

#### **Glassmorphism**
- Backdrop-filter: blur(20px) saturate(180%)
- Box-shadow con inset para profundidad
- Border highlights con accent colors
- Gradient overlays

---

### ⌨️ **Keyboard Shortcuts**

| Shortcut | Acción |
|----------|--------|
| `Ctrl+K` | Abrir Command Palette |
| `Ctrl+/` | Abrir Shortcuts Help |
| `Ctrl+N` | Nuevo Workspace |
| `Ctrl+P` | Nueva Página |
| `Ctrl+D` | Duplicar Bloque |
| `Ctrl+S` | Guardar (auto) |
| `Escape` | Cerrar Modales |
| `↑↓` | Navegar Command Palette |
| `Enter` | Ejecutar Comando |

---

### 🗂️ **Estructura del Proyecto**

```
Lab07/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   ├── Block/
│   │   │   ├── BlockContainer.jsx
│   │   │   ├── TextBlock.jsx
│   │   │   ├── CodeBlock.jsx
│   │   │   ├── TaskBlock.jsx
│   │   │   ├── CanvasBlock.jsx
│   │   │   ├── ImageBlock.jsx
│   │   │   └── PDFBlock.jsx
│   │   ├── Layout/
│   │   │   └── Sidebar.jsx
│   │   ├── Page/
│   │   │   ├── GridBackground.jsx
│   │   │   └── PageModal.jsx
│   │   ├── UI/
│   │   │   ├── AnimatedComponents.jsx
│   │   │   ├── CommandPalette.jsx
│   │   │   ├── ContextMenu.jsx
│   │   │   ├── GlassComponents.jsx
│   │   │   ├── PageTransitions.jsx
│   │   │   ├── ParticleEffects.jsx
│   │   │   ├── ShortcutsModal.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   └── Toast.jsx
│   │   └── Workspace/
│   │       ├── WorkspaceCard.jsx
│   │       └── WorkspaceModal.jsx
│   ├── hooks/
│   │   ├── useKeyboardShortcuts.js
│   │   └── useReducedMotion.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── PageEditor.jsx
│   │   └── WorkspaceDetail.jsx
│   ├── services/
│   │   ├── blockService.js
│   │   ├── pageService.js
│   │   ├── storageService.js
│   │   └── workspaceService.js
│   ├── utils/
│   │   ├── animations.js
│   │   ├── canvasHelpers.js
│   │   ├── constants.js
│   │   └── shortcuts.js
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── SUPABASE_STORAGE_SETUP.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

### 📊 **Estadísticas del Proyecto**

- **Archivos creados**: 35+
- **Archivos modificados**: 20+
- **Líneas de código**: ~6,000+
- **Componentes**: 40+
- **Variantes de animación**: 35+
- **Keyboard shortcuts**: 15+
- **Tipos de bloques**: 6
- **Particle effects**: 4
- **Page transitions**: 5

---

### 🚀 **Instalación y Configuración**

#### **1. Clonar e Instalar**
```bash
cd Lab07
npm install
```

#### **2. Configurar Supabase**

Crear archivo `.env`:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

#### **3. Configurar Storage** (Ver `SUPABASE_STORAGE_SETUP.md`)
```sql
-- Crear bucket 'nexusnote-files'
-- Ejecutar 4 políticas RLS
```

#### **4. Ejecutar Desarrollo**
```bash
npm run dev
```

#### **5. Build para Producción**
```bash
npm run build
```

---

### 🎯 **Características Técnicas**

#### **Frontend**
- React 18
- Vite (build tool)
- Tailwind CSS v4
- Framer Motion (animaciones)
- React Hot Toast (notificaciones)
- Heroicons (iconos)
- Fuse.js (búsqueda)
- DnD Kit (drag & drop)
- UUID (identificadores)

#### **Backend**
- Supabase (BaaS)
- PostgreSQL (base de datos)
- Supabase Auth (autenticación)
- Supabase Storage (archivos)
- Row Level Security (RLS)

#### **Animaciones**
- Spring physics (stiffness: 300-500)
- Easing functions personalizadas
- Stagger effects (delay: 0.1s)
- Layout animations (layoutId)
- Particle systems (confetti, sparkles)

---

### 🎨 **Características de UX**

- ✅ **60 FPS**: Todas las animaciones optimizadas
- ✅ **Reduced Motion**: Soporte para accesibilidad
- ✅ **Responsive**: Adaptable a todos los tamaños
- ✅ **Glassmorphism**: Efectos de vidrio modernos
- ✅ **Micro-interactions**: Feedback en cada acción
- ✅ **Loading States**: Indicadores visuales
- ✅ **Toast Notifications**: Feedback instantáneo
- ✅ **Keyboard Navigation**: Accesible por teclado
- ✅ **Dark Theme**: Paleta oscura premium

---

### 📱 **Funcionalidades**

#### **Gestión de Workspaces**
- Crear, editar, eliminar workspaces
- Emojis personalizados
- Colores personalizados
- Grid con stagger animation
- Confetti al crear el primero

#### **Gestión de Páginas**
- Crear, editar, eliminar páginas
- Grid backgrounds (dots, squares, lines)
- Drag & drop de bloques
- Auto-save continuo
- Historial de cambios

#### **Gestión de Bloques**
- 6 tipos de bloques
- Drag & drop para reordenar
- Context menu (click derecho)
- Duplicar bloques
- Eliminar con confirmación

#### **Almacenamiento**
- Supabase Storage para archivos
- Organización por usuario
- RLS policies de seguridad
- URLs públicas automáticas

---

### 🔒 **Seguridad**

- ✅ **Autenticación**: Supabase Auth
- ✅ **RLS Policies**: Solo el dueño accede a sus datos
- ✅ **Storage Policies**: Archivos privados por usuario
- ✅ **Validación**: Cliente y servidor
- ✅ **HTTPS**: Comunicación encriptada

---

### 🎉 **Resultado Final**

NexusNote Academic es una aplicación **premium, profesional y memorable** con:
- Animaciones fluidas a 60 FPS
- Micro-interacciones en cada elemento
- Sistema de diseño consistente
- Glassmorphism moderno
- 6 tipos de bloques funcionales
- Upload de imágenes y PDFs
- Canvas interactivo para dibujo
- Keyboard shortcuts completos
- Particle effects celebratorios
- Accesibilidad integrada

**¡Una experiencia de usuario excepcional!** ✨🎓

---

### 📞 **Soporte**

Para configuración de Supabase Storage, ver: `SUPABASE_STORAGE_SETUP.md`

---

**Desarrollado con ❤️ usando React, Vite, Supabase y Framer Motion**
#   N e x u s N o t e - A c a d e m i c  
 