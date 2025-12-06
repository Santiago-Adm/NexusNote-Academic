# Configuración de Base de Datos para Templates y Tags

## Instrucciones para configurar las tablas en Supabase

### 1. Ir a SQL Editor en Supabase Dashboard

1. Abre tu proyecto en Supabase
2. Ve a **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia y pega el siguiente código SQL

---

## SQL para Templates y Tags

```sql
-- ============================================
-- TABLA DE TEMPLATES
-- ============================================

CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '📄',
  category TEXT, -- 'academic', 'project', 'meeting', 'personal'
  is_public BOOLEAN DEFAULT false,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array de bloques predefinidos
  grid_type TEXT DEFAULT 'none',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_is_public ON templates(is_public);

-- ============================================
-- RLS POLICIES PARA TEMPLATES
-- ============================================

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden ver sus propios templates y los públicos
CREATE POLICY "Users can view own templates and public ones"
  ON templates FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

-- Policy: Usuarios pueden crear sus propios templates
CREATE POLICY "Users can create own templates"
  ON templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuarios pueden actualizar sus propios templates
CREATE POLICY "Users can update own templates"
  ON templates FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Usuarios pueden eliminar sus propios templates
CREATE POLICY "Users can delete own templates"
  ON templates FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- TABLA DE TAGS (si no existe)
-- ============================================

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#4db8a3',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índice para mejorar performance
CREATE INDEX IF NOT EXISTS idx_tags_user_id ON tags(user_id);

-- Constraint: Nombre único por usuario
CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_user_name ON tags(user_id, name);

-- ============================================
-- RLS POLICIES PARA TAGS
-- ============================================

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden ver sus propios tags
CREATE POLICY "Users can view own tags"
  ON tags FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuarios pueden crear sus propios tags
CREATE POLICY "Users can create own tags"
  ON tags FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuarios pueden actualizar sus propios tags
CREATE POLICY "Users can update own tags"
  ON tags FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Usuarios pueden eliminar sus propios tags
CREATE POLICY "Users can delete own tags"
  ON tags FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- TABLA DE RELACIÓN PAGE_TAGS (Many-to-Many)
-- ============================================

CREATE TABLE IF NOT EXISTS page_tags (
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (page_id, tag_id)
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_page_tags_page_id ON page_tags(page_id);
CREATE INDEX IF NOT EXISTS idx_page_tags_tag_id ON page_tags(tag_id);

-- ============================================
-- RLS POLICIES PARA PAGE_TAGS
-- ============================================

ALTER TABLE page_tags ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden gestionar tags en sus propias páginas
CREATE POLICY "Users can manage tags on own pages"
  ON page_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM pages
      JOIN workspaces ON pages.workspace_id = workspaces.id
      WHERE pages.id = page_tags.page_id
      AND workspaces.user_id = auth.uid()
    )
  );

-- ============================================
-- INSERTAR TEMPLATES PREDEFINIDOS (OPCIONAL)
-- ============================================

-- Nota: Estos templates serán públicos y disponibles para todos los usuarios
-- Puedes ejecutar esto una sola vez o crear los templates desde la aplicación

-- Template: Notas de Clase
INSERT INTO templates (user_id, name, description, icon, category, is_public, grid_type, blocks)
VALUES (
  NULL, -- NULL para templates del sistema
  'Notas de Clase',
  'Estructura para tomar notas durante una clase',
  '📝',
  'academic',
  true,
  'lines',
  '[
    {"type": "text", "content": {"text": "# Clase: [Nombre de la materia]\\n## Fecha: [DD/MM/YYYY]"}},
    {"type": "text", "content": {"text": "### Objetivos de la clase\\n- "}},
    {"type": "text", "content": {"text": "### Contenido principal\\n"}},
    {"type": "code", "content": {"code": "// Ejemplos de código", "language": "javascript"}},
    {"type": "text", "content": {"text": "### Preguntas y dudas\\n- "}},
    {"type": "task", "content": {"tasks": [{"id": "1", "text": "Revisar material complementario", "completed": false}]}}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Template: Proyecto de Software
INSERT INTO templates (user_id, name, description, icon, category, is_public, grid_type, blocks)
VALUES (
  NULL,
  'Proyecto de Software',
  'Planificación y documentación de proyecto',
  '💻',
  'project',
  true,
  'squares',
  '[
    {"type": "text", "content": {"text": "# Proyecto: [Nombre]\\n## Stack Tecnológico\\n"}},
    {"type": "task", "content": {"tasks": [
      {"id": "1", "text": "Setup del proyecto", "completed": false},
      {"id": "2", "text": "Diseño de arquitectura", "completed": false},
      {"id": "3", "text": "Implementación", "completed": false},
      {"id": "4", "text": "Testing", "completed": false},
      {"id": "5", "text": "Deploy", "completed": false}
    ]}},
    {"type": "text", "content": {"text": "## Diagrama de arquitectura"}},
    {"type": "canvas", "content": {"dataURL": null, "gridType": "squares", "width": 800, "height": 600}},
    {"type": "code", "content": {"code": "// Código principal", "language": "javascript"}}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Template: Investigación
INSERT INTO templates (user_id, name, description, icon, category, is_public, grid_type, blocks)
VALUES (
  NULL,
  'Investigación',
  'Estructura para documentar investigación',
  '🔬',
  'academic',
  true,
  'none',
  '[
    {"type": "text", "content": {"text": "# Investigación: [Tema]\\n## Hipótesis\\n"}},
    {"type": "text", "content": {"text": "## Metodología\\n"}},
    {"type": "text", "content": {"text": "## Resultados\\n"}},
    {"type": "image", "content": {"url": null, "path": null, "caption": "Gráficos y datos"}},
    {"type": "text", "content": {"text": "## Conclusiones\\n"}},
    {"type": "text", "content": {"text": "## Referencias\\n1. "}}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Template: Reunión
INSERT INTO templates (user_id, name, description, icon, category, is_public, grid_type, blocks)
VALUES (
  NULL,
  'Reunión',
  'Acta de reunión con agenda y acuerdos',
  '📅',
  'meeting',
  true,
  'none',
  '[
    {"type": "text", "content": {"text": "# Reunión: [Título]\\n**Fecha:** [DD/MM/YYYY]\\n**Participantes:** "}},
    {"type": "text", "content": {"text": "## Agenda\\n1. "}},
    {"type": "text", "content": {"text": "## Notas\\n"}},
    {"type": "task", "content": {"tasks": [{"id": "1", "text": "Acción a tomar", "completed": false}]}},
    {"type": "text", "content": {"text": "## Próximos pasos\\n"}}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Template: Diario Personal
INSERT INTO templates (user_id, name, description, icon, category, is_public, grid_type, blocks)
VALUES (
  NULL,
  'Diario Personal',
  'Entrada de diario con reflexiones',
  '✨',
  'personal',
  true,
  'none',
  '[
    {"type": "text", "content": {"text": "# [Fecha]\\n\\n## ¿Cómo me siento hoy?\\n"}},
    {"type": "text", "content": {"text": "## Lo mejor del día\\n"}},
    {"type": "text", "content": {"text": "## Aprendizajes\\n"}},
    {"type": "task", "content": {"tasks": [{"id": "1", "text": "Objetivo para mañana", "completed": false}]}}
  ]'::jsonb
) ON CONFLICT DO NOTHING;
```

---

## 2. Verificar Configuración

Después de ejecutar el SQL, verifica:

### Templates:
1. Ve a **Table Editor** > **templates**
2. Deberías ver 5 templates predefinidos
3. Verifica que las políticas RLS estén activas

### Tags:
1. Ve a **Table Editor** > **tags**
2. La tabla debería estar vacía (los usuarios crearán sus tags)
3. Verifica que las políticas RLS estén activas

### Page_Tags:
1. Ve a **Table Editor** > **page_tags**
2. La tabla debería estar vacía
3. Verifica que las políticas RLS estén activas

---

## 3. Troubleshooting

### Error: "relation already exists"
- Algunas tablas ya existen, esto es normal
- El SQL usa `IF NOT EXISTS` para evitar errores
- Puedes ignorar estos warnings

### Error: "policy already exists"
- Las políticas ya están creadas
- Usa `DROP POLICY` si necesitas recrearlas

### Templates no aparecen:
- Verifica que `is_public = true`
- Confirma que el SQL de INSERT se ejecutó correctamente
- Revisa la tabla `templates` en Table Editor

### Tags no funcionan:
- Verifica que las políticas RLS estén activas
- Confirma que el usuario esté autenticado
- Revisa la consola del navegador para errores

---

## 4. Consultas Útiles

### Ver todos los templates:
```sql
SELECT * FROM templates ORDER BY created_at DESC;
```

### Ver tags de un usuario:
```sql
SELECT * FROM tags WHERE user_id = 'user-id-here';
```

### Ver páginas con sus tags:
```sql
SELECT 
  p.title,
  array_agg(t.name) as tags
FROM pages p
LEFT JOIN page_tags pt ON p.id = pt.page_id
LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY p.id, p.title;
```

### Eliminar templates predefinidos (si es necesario):
```sql
DELETE FROM templates WHERE user_id IS NULL;
```

---

## ✅ Checklist de Configuración

- [ ] Tabla `templates` creada
- [ ] Tabla `tags` creada
- [ ] Tabla `page_tags` creada
- [ ] Políticas RLS activas en las 3 tablas
- [ ] 5 templates predefinidos insertados
- [ ] Índices creados para performance
- [ ] Constraints de unicidad aplicados

---

## 🎉 ¡Listo!

Una vez completados estos pasos, el sistema de templates y tags estará completamente funcional.

**Próximo paso:** Integrar los componentes en la UI de la aplicación.
