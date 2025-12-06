# 📖 Guía de Usuario - NexusNote Academic

## 🎯 Introducción

Bienvenido a **NexusNote Academic**, tu sistema de notas premium para organizar apuntes, tareas, diagramas y documentos académicos.

---

## 🚀 Primeros Pasos

### 1. **Registro e Inicio de Sesión**
1. Abre la aplicación en tu navegador
2. Haz clic en "Iniciar Sesión"
3. Ingresa tu email y contraseña
4. Si es tu primera vez, regístrate con email/contraseña

### 2. **Crear tu Primer Workspace**
1. En el Dashboard, haz clic en **"+ Nuevo Workspace"**
2. Elige un **emoji** representativo (📚, 💼, 🎯, etc.)
3. Selecciona un **color** de la paleta
4. Escribe un **nombre** (ej: "Matemáticas Avanzadas")
5. Agrega una **descripción** (opcional)
6. Haz clic en **"Crear Workspace"**
7. 🎉 **¡Confetti!** Se celebra tu primer workspace

### 3. **Crear tu Primera Página**
1. Entra a un workspace
2. Haz clic en **"+ Nueva Página"**
3. Escribe un **título** (ej: "Notas de Cálculo I")
4. Selecciona un **tipo de grid**:
   - **Puntos**: Ideal para dibujo libre
   - **Cuadrícula**: Perfecto para diagramas
   - **Líneas**: Excelente para escritura
   - **Sin Grid**: Limpio y minimalista
5. Haz clic en **"Crear Página"**

---

## 📝 Trabajando con Bloques

### **Agregar un Bloque**

**Método 1: Botón flotante**
1. Scroll hasta el final de la página
2. Haz clic en **"+ Agregar Bloque"**
3. Selecciona el tipo de bloque

**Método 2: Slash Commands** (próximamente)
1. Escribe `/` en cualquier lugar
2. Aparecerá el menú de bloques
3. Selecciona con flechas ↑↓ y Enter

---

## 🎨 Tipos de Bloques

### **1. Text Block (📝)**

**Características:**
- Editor Markdown
- Preview en tiempo real
- Auto-save cada 2 segundos

**Cómo usar:**
1. Agrega un bloque de texto
2. Escribe en Markdown:
   ```markdown
   # Título
   ## Subtítulo
   **Negrita** y *cursiva*
   - Lista
   - De items
   ```
3. Alterna entre **Editar** y **Preview**
4. Se guarda automáticamente

**Shortcuts:**
- `Ctrl+B`: Negrita
- `Ctrl+I`: Cursiva
- `Ctrl+K`: Link

---

### **2. Code Block (💻)**

**Características:**
- Syntax highlighting
- 18 lenguajes soportados
- Números de línea

**Cómo usar:**
1. Agrega un bloque de código
2. Selecciona el **lenguaje** (JavaScript, Python, etc.)
3. Escribe tu código
4. El highlighting se aplica automáticamente

**Lenguajes soportados:**
- JavaScript, TypeScript, Python, Java
- C++, C, C#, Go, Rust, PHP, Ruby
- SQL, HTML, CSS, JSON, Markdown, Bash

---

### **3. Task Block (✅)**

**Características:**
- Checkboxes animados
- Progress bar automática
- Sparkles al completar todas ✨

**Cómo usar:**
1. Agrega un bloque de tareas
2. Haz clic en **"+ Agregar tarea"**
3. Escribe el nombre de la tarea
4. Presiona `Enter` para agregar otra
5. Haz clic en el checkbox para completar
6. 🎉 **¡Sparkles!** cuando completes todas

**Shortcuts:**
- `Enter`: Nueva tarea
- `Backspace` (en tarea vacía): Eliminar tarea

**Progress Bar:**
- Muestra automáticamente: "X de Y completadas"
- Barra animada con spring physics
- Porcentaje en tiempo real

---

### **4. Canvas Block (🎨)**

**Características:**
- 7 herramientas de dibujo
- 8 colores disponibles
- 4 tipos de grid
- Undo/Redo ilimitado
- Export a PNG

**Herramientas:**

1. **🖊️ Lápiz**: Dibujo libre con línea fina
2. **✏️ Marcador**: Dibujo libre con línea gruesa
3. **⬜ Rectángulo**: Dibuja rectángulos
4. **⭕ Círculo**: Dibuja círculos
5. **➡️ Flecha**: Dibuja flechas con punta
6. **📏 Línea**: Dibuja líneas rectas
7. **🗑️ Borrador**: Borra áreas del canvas

**Cómo usar:**
1. Agrega un bloque de canvas
2. Selecciona una **herramienta** del toolbar
3. Elige un **color** (8 opciones)
4. Selecciona el **grosor** (Fino, Normal, Grueso, Muy Grueso)
5. Dibuja en el canvas
6. Usa **Deshacer/Rehacer** si te equivocas
7. Cambia el **tipo de grid** si lo necesitas
8. Haz clic en **"Exportar"** para descargar como PNG

**Grid Types:**
- **Puntos**: Puntos cada 20px
- **Cuadrícula**: Líneas cada 20px
- **Líneas**: Líneas horizontales cada 30px
- **Sin Grid**: Canvas limpio

**Tips:**
- El canvas se guarda automáticamente cada 5 segundos
- Puedes hacer zoom con Ctrl + Scroll (próximamente)
- Usa el borrador para correcciones rápidas

---

### **5. Image Block (🖼️)**

**Características:**
- Upload de imágenes
- Preview responsive
- Caption editable
- Vista fullscreen
- Lazy loading

**Cómo usar:**
1. Agrega un bloque de imagen
2. Haz clic en el área de upload
3. Selecciona una imagen (JPG, PNG, GIF, WebP)
4. Espera a que se suba (máx 5MB)
5. Agrega una **descripción** (opcional)
6. Haz **hover** para ver controles:
   - 🔍 **Fullscreen**: Ver en pantalla completa
   - 🗑️ **Eliminar**: Borrar imagen

**Formatos soportados:**
- JPG/JPEG
- PNG
- GIF
- WebP

**Tamaño máximo:** 5MB

**Tips:**
- Las imágenes se almacenan en Supabase Storage
- Solo tú puedes ver tus imágenes
- Haz clic en la imagen para fullscreen

---

### **6. PDF Block (📄)**

**Características:**
- Upload de PDFs
- Preview con iframe
- Título editable
- Descarga directa

**Cómo usar:**
1. Agrega un bloque de PDF
2. Haz clic en el área de upload
3. Selecciona un PDF (máx 10MB)
4. Espera a que se suba
5. Edita el **título** si quieres
6. Usa los botones:
   - 📥 **Descargar**: Descarga el PDF
   - 🗑️ **Eliminar**: Borra el PDF

**Tamaño máximo:** 10MB

**Tips:**
- El PDF se muestra en un iframe de 96 de altura
- Puedes scrollear dentro del preview
- Los PDFs se almacenan de forma segura

---

## ⌨️ Keyboard Shortcuts

### **Globales**
| Shortcut | Acción |
|----------|--------|
| `Ctrl+K` | Abrir Command Palette |
| `Ctrl+/` | Ver todos los shortcuts |
| `Ctrl+N` | Nuevo Workspace |
| `Ctrl+P` | Nueva Página |
| `Escape` | Cerrar modales |

### **Command Palette (Ctrl+K)**
| Shortcut | Acción |
|----------|--------|
| `↑` `↓` | Navegar opciones |
| `Enter` | Ejecutar comando |
| `Escape` | Cerrar palette |
| Escribir | Búsqueda fuzzy |

### **En Bloques**
| Shortcut | Acción |
|----------|--------|
| `Ctrl+D` | Duplicar bloque |
| Click derecho | Context menu |
| Arrastrar ⋮⋮ | Reordenar bloque |

---

## 🎯 Características Avanzadas

### **Command Palette (Ctrl+K)**

El Command Palette es tu centro de control rápido:

**Cómo usar:**
1. Presiona `Ctrl+K` en cualquier momento
2. Escribe para buscar (búsqueda fuzzy)
3. Usa `↑` `↓` para navegar
4. Presiona `Enter` para ejecutar

**Comandos disponibles:**
- Crear Workspace
- Crear Página
- Ir a Dashboard
- Ver Shortcuts
- Buscar páginas
- Buscar bloques

**Tips:**
- La búsqueda es fuzzy (ej: "nw" encuentra "Nuevo Workspace")
- Los comandos más usados aparecen primero
- Funciona desde cualquier página

---

### **Drag & Drop**

**Reordenar Bloques:**
1. Haz hover sobre un bloque
2. Aparecerá el handle de arrastre (⋮⋮)
3. Haz clic y arrastra
4. Suelta en la nueva posición
5. Se guarda automáticamente

**Efectos visuales:**
- Shadow aumentado durante drag
- Rotación sutil (2deg)
- Cursor cambia a "grabbing"
- Opacity 50% del bloque arrastrado

---

### **Context Menu**

**Cómo usar:**
1. Haz **click derecho** en un bloque
2. Aparece el menú contextual
3. Selecciona una opción:
   - ✏️ **Editar**: Enfoca el bloque
   - 📋 **Duplicar**: Crea una copia
   - 🗑️ **Eliminar**: Borra el bloque
   - ↑ **Mover arriba**: Sube el bloque
   - ↓ **Mover abajo**: Baja el bloque

---

### **Auto-Save**

**Cómo funciona:**
- Todos los bloques se guardan automáticamente
- **Text/Code**: Cada 2 segundos
- **Tasks**: Cada cambio
- **Canvas**: Cada 5 segundos
- **Images/PDFs**: Al subir

**Indicador:**
- ☁️ **"Guardando..."**: Guardando cambios
- ✓ **"Guardado"**: Todo sincronizado

---

## 🎨 Personalización

### **Workspaces**

**Emojis disponibles:**
📚 📝 💼 🎯 💡 🔬 🎨 ⚡ 🌟 🔧 📊 🎓

**Colores disponibles:**
- Cyan (#2d7a8e)
- Teal (#3a9299)
- Highlight (#4db8a3)
- Blue (#1a4d6f)
- Purple (#5c4db8)
- Pink (#b84d8e)

**Cómo personalizar:**
1. Haz clic en el workspace
2. Click en "Editar"
3. Cambia emoji, color, nombre o descripción
4. Guarda los cambios

---

### **Páginas**

**Grid Backgrounds:**
- **Puntos**: Ideal para dibujo libre
- **Cuadrícula**: Perfecto para diagramas
- **Líneas**: Excelente para escritura
- **Sin Grid**: Limpio y minimalista

**Cómo cambiar:**
1. Edita la página
2. Selecciona nuevo tipo de grid
3. Guarda

---

## 🎉 Efectos Especiales

### **Confetti 🎊**
- Se activa al crear tu **primer workspace**
- 50 partículas de colores
- Caen con física realista
- Duración: 3 segundos

### **Sparkles ✨**
- Se activa al **completar todas las tareas**
- 30 estrellas que explotan
- Animación radial
- Duración: 2 segundos

---

## 💡 Tips y Trucos

### **Productividad**
1. Usa `Ctrl+K` para acceso rápido a todo
2. Aprende los shortcuts principales
3. Usa el Command Palette en vez del mouse
4. Organiza por workspaces temáticos
5. Usa grids apropiados para cada tipo de contenido

### **Organización**
1. **Un workspace por materia/proyecto**
2. **Una página por tema/clase**
3. **Bloques de texto** para apuntes
4. **Bloques de código** para ejemplos
5. **Bloques de tareas** para TODOs
6. **Canvas** para diagramas
7. **Imágenes** para capturas/fotos
8. **PDFs** para documentos de referencia

### **Rendimiento**
1. Las imágenes usan lazy loading
2. Los bloques se cargan bajo demanda
3. Auto-save optimizado con debounce
4. Animaciones a 60 FPS

---

## ❓ Preguntas Frecuentes

### **¿Cómo elimino un workspace?**
1. Entra al workspace
2. Click en el botón "Eliminar"
3. Confirma la eliminación
4. Se borrarán todas las páginas y bloques

### **¿Cuántos bloques puedo tener?**
Ilimitados. No hay límite de bloques por página.

### **¿Mis archivos están seguros?**
Sí. Todos los archivos se almacenan en Supabase Storage con políticas RLS. Solo tú puedes acceder a tus archivos.

### **¿Puedo exportar mis notas?**
- Canvas: Exporta como PNG
- PDFs: Descarga directamente
- Texto/Código: Copia y pega (export completo próximamente)

### **¿Funciona offline?**
No actualmente. Requiere conexión a internet para sincronizar con Supabase.

### **¿Hay límite de almacenamiento?**
Depende de tu plan de Supabase:
- Free tier: 1GB
- Pro: 100GB+

---

## 🆘 Solución de Problemas

### **No puedo subir imágenes**
1. Verifica que el archivo sea JPG, PNG, GIF o WebP
2. Confirma que sea menor a 5MB
3. Asegúrate de estar logueado
4. Revisa la configuración de Supabase Storage

### **No puedo subir PDFs**
1. Verifica que sea un archivo PDF válido
2. Confirma que sea menor a 10MB
3. Asegúrate de estar logueado

### **Los shortcuts no funcionan**
1. Verifica que no estés en un input/textarea
2. Confirma que uses Ctrl (no Cmd en Mac)
3. Recarga la página

### **Las animaciones van lentas**
1. Cierra otras pestañas del navegador
2. Actualiza tu navegador
3. Verifica tu GPU/hardware

---

## 🎓 ¡Disfruta NexusNote Academic!

Ahora estás listo para tomar notas como un profesional. ¡Explora todas las características y encuentra tu flujo de trabajo ideal!

**¿Necesitas ayuda?** Consulta el README.md para detalles técnicos.

---

**Happy Note-Taking! 📝✨**
