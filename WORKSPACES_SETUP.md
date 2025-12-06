# Instrucciones para Configurar el Sistema de Workspaces

## Paso 1: Ejecutar el SQL en Supabase

1. Abre tu proyecto de Supabase: https://supabase.com/dashboard
2. Ve a la sección **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia todo el contenido del archivo `supabase_migration.sql`
5. Pega el contenido en el editor
6. Haz clic en **Run** para ejecutar el script

El script creará:
- ✅ 4 tablas: `workspaces`, `pages`, `blocks`, `tags`
- ✅ Índices para optimizar consultas
- ✅ Triggers para actualizar timestamps automáticamente
- ✅ Políticas RLS (Row Level Security) para seguridad
- ✅ Soporte para soft delete (borrado lógico)

## Paso 2: Verificar la Instalación

Ejecuta estas queries en el SQL Editor para verificar:

```sql
-- Ver todas las tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('workspaces', 'pages', 'blocks', 'tags');

-- Verificar políticas RLS
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

## Paso 3: Probar la Aplicación

1. Asegúrate de que el servidor de desarrollo esté corriendo:
   ```bash
   npm run dev
   ```

2. Abre http://localhost:5175/ (o el puerto que esté usando)

3. Inicia sesión con tu cuenta

4. Deberías ver el Dashboard con la opción "Nuevo Workspace"

## Funcionalidades Disponibles

### Dashboard
- ✅ Ver todos tus workspaces en un grid responsive
- ✅ Crear nuevo workspace con el botón "+ Nuevo Workspace"
- ✅ Editar workspace (botón de lápiz en cada card)
- ✅ Eliminar workspace (botón de basura en cada card)
- ✅ Click en un workspace para ver sus páginas

### Crear/Editar Workspace
- ✅ Nombre del workspace (requerido)
- ✅ Descripción opcional
- ✅ Selector de emoji (12 opciones)
- ✅ Selector de color (6 opciones de la paleta)

### Workspace Detail
- ✅ Ver información del workspace
- ✅ Lista de páginas (por ahora vacía, se implementará después)
- ✅ Botón para crear nueva página (preparado para futura implementación)

## Características Técnicas

### Soft Delete
Los workspaces no se eliminan permanentemente, solo se marcan con `deleted_at`. Esto permite:
- Recuperar workspaces eliminados accidentalmente
- Mejor auditoría de cambios
- Evitar pérdida de datos

### Seguridad
- Row Level Security (RLS) activado en todas las tablas
- Los usuarios solo pueden ver y modificar sus propios datos
- Políticas que verifican `deleted_at IS NULL` para workspaces

### Performance
- Índices en columnas frecuentemente consultadas
- Queries optimizadas con `select('*, pages(count)')` para contar páginas
- Timestamps actualizados automáticamente con triggers

## Próximos Pasos

Una vez que el sistema de workspaces esté funcionando, puedes:
1. Implementar el sistema de páginas
2. Agregar bloques de contenido a las páginas
3. Implementar el sistema de tags
4. Agregar búsqueda y filtros
5. Implementar colaboración en tiempo real

## Solución de Problemas

### Error: "relation 'workspaces' does not exist"
- Asegúrate de haber ejecutado el script SQL completo en Supabase

### Error: "permission denied for table workspaces"
- Verifica que las políticas RLS se hayan creado correctamente
- Asegúrate de estar autenticado con una cuenta válida

### No se muestran los workspaces
- Abre la consola del navegador (F12) para ver errores
- Verifica que el usuario esté autenticado
- Comprueba que las políticas RLS permitan SELECT

### Error al crear workspace
- Verifica que todos los campos requeridos estén llenos
- Comprueba la consola para ver el error específico de Supabase
