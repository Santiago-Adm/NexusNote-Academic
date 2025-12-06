# Configuración de Supabase Storage para NexusNote Academic

## Instrucciones para configurar el almacenamiento de archivos

### 1. Crear Bucket en Supabase Dashboard

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **Storage** en el menú lateral
3. Click en **"New bucket"**
4. Configuración del bucket:
   - **Name**: `nexusnote-files`
   - **Public**: ❌ **NO** (desactivado - solo accesible por usuarios autenticados)
   - **File size limit**: 10 MB (opcional)
   - **Allowed MIME types**: Dejar vacío para permitir todos

### 2. Ejecutar Políticas RLS (Row Level Security)

Ve a **SQL Editor** en Supabase y ejecuta el siguiente código:

```sql
-- ============================================
-- POLÍTICAS DE SEGURIDAD PARA STORAGE
-- ============================================

-- Policy: Usuarios pueden subir sus propios archivos
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'nexusnote-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Usuarios pueden ver sus propios archivos
CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'nexusnote-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Usuarios pueden actualizar sus propios archivos
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'nexusnote-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Usuarios pueden eliminar sus propios archivos
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'nexusnote-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### 3. Verificar Configuración

Después de ejecutar las políticas, verifica:

1. En **Storage** > **Policies**, deberías ver 4 políticas activas para `nexusnote-files`
2. Intenta subir un archivo de prueba desde la aplicación
3. Verifica que el archivo se guarda en la carpeta `{user_id}/`

### 4. Estructura de Carpetas

Los archivos se organizarán automáticamente así:

```
nexusnote-files/
├── {user_id_1}/
│   ├── 1701234567890.jpg
│   ├── 1701234568901.png
│   └── 1701234569012.pdf
├── {user_id_2}/
│   ├── 1701234570123.jpg
│   └── 1701234571234.pdf
└── ...
```

### 5. Límites y Configuración Recomendada

- **Imágenes**: Máximo 5 MB
- **PDFs**: Máximo 10 MB
- **Formatos permitidos**:
  - Imágenes: JPG, PNG, GIF, WebP
  - Documentos: PDF

### 6. Troubleshooting

**Error: "new row violates row-level security policy"**
- Verifica que las políticas RLS estén creadas correctamente
- Asegúrate de que el usuario esté autenticado
- Revisa que el bucket se llame exactamente `nexusnote-files`

**Error: "Bucket not found"**
- Verifica que el bucket exista en Storage
- Confirma el nombre del bucket en el código

**Archivos no se ven**
- Verifica que las políticas SELECT estén activas
- Confirma que estás usando el mismo usuario que subió el archivo

### 7. Monitoreo

Para ver todos los archivos subidos:

```sql
SELECT 
  name,
  bucket_id,
  owner,
  created_at,
  updated_at,
  metadata->>'size' as file_size
FROM storage.objects
WHERE bucket_id = 'nexusnote-files'
ORDER BY created_at DESC;
```

### 8. Limpieza (Opcional)

Para eliminar archivos huérfanos (sin bloque asociado):

```sql
-- CUIDADO: Esto eliminará archivos permanentemente
-- Ejecutar solo si sabes lo que haces

DELETE FROM storage.objects
WHERE bucket_id = 'nexusnote-files'
AND name NOT IN (
  SELECT content->>'path' 
  FROM blocks 
  WHERE type IN ('image', 'pdf')
  AND content->>'path' IS NOT NULL
);
```

## ✅ Checklist de Configuración

- [ ] Bucket `nexusnote-files` creado
- [ ] Bucket configurado como **privado** (no público)
- [ ] 4 políticas RLS ejecutadas (INSERT, SELECT, UPDATE, DELETE)
- [ ] Políticas verificadas en Dashboard
- [ ] Prueba de upload realizada
- [ ] Archivos se guardan en carpetas por usuario

## 🎉 ¡Listo!

Una vez completados estos pasos, el sistema de upload de imágenes y PDFs estará completamente funcional.
