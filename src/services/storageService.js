import { supabase } from '../lib/supabase'

/**
 * Upload file to Supabase Storage
 * @param {File} file - File to upload
 * @param {string} userId - User ID for folder organization
 * @returns {Promise<{path: string, url: string}>}
 */
export const uploadFile = async (file, userId) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
        .from('nexusnote-files')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
        .from('nexusnote-files')
        .getPublicUrl(fileName)

    return { path: fileName, url: urlData.publicUrl }
}

/**
 * Delete file from Supabase Storage
 * @param {string} filePath - Path to file in storage
 */
export const deleteFile = async (filePath) => {
    const { error } = await supabase.storage
        .from('nexusnote-files')
        .remove([filePath])

    if (error) throw error
}

/**
 * Get public URL for a file
 * @param {string} filePath - Path to file in storage
 * @returns {string} Public URL
 */
export const getFileUrl = (filePath) => {
    const { data } = supabase.storage
        .from('nexusnote-files')
        .getPublicUrl(filePath)

    return data.publicUrl
}

/**
 * Get current user ID
 * @returns {Promise<string>}
 */
export const getCurrentUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('No authenticated user')
    return session.user.id
}

/**
 * Format file size to human readable
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
