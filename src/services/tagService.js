import { supabase } from '../lib/supabase'

/**
 * Get all tags for a user
 */
export const getTags = async (userId) => {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('user_id', userId)
        .order('name')

    if (error) throw error
    return data || []
}

/**
 * Create a new tag
 */
export const createTag = async (tag) => {
    const { data, error } = await supabase.from('tags').insert([tag]).select().single()

    if (error) throw error
    return data
}

/**
 * Update tag
 */
export const updateTag = async (id, updates) => {
    const { data, error } = await supabase.from('tags').update(updates).eq('id', id).select().single()

    if (error) throw error
    return data
}

/**
 * Delete tag
 */
export const deleteTag = async (id) => {
    const { error } = await supabase.from('tags').delete().eq('id', id)

    if (error) throw error
}

/**
 * Add tag to page
 */
export const addTagToPage = async (pageId, tagId) => {
    const { error } = await supabase.from('page_tags').insert([{ page_id: pageId, tag_id: tagId }])

    if (error) {
        // Si ya existe, ignorar el error
        if (error.code === '23505') return
        throw error
    }
}

/**
 * Remove tag from page
 */
export const removeTagFromPage = async (pageId, tagId) => {
    const { error } = await supabase.from('page_tags').delete().eq('page_id', pageId).eq('tag_id', tagId)

    if (error) throw error
}

/**
 * Get tags for a specific page
 */
export const getPageTags = async (pageId) => {
    const { data, error } = await supabase
        .from('page_tags')
        .select('tag_id, tags(*)')
        .eq('page_id', pageId)

    if (error) throw error
    return data ? data.map((pt) => pt.tags) : []
}

/**
 * Get pages by tag
 */
export const getPagesByTag = async (tagId) => {
    const { data, error } = await supabase
        .from('page_tags')
        .select('page_id, pages(*, workspaces(name, emoji))')
        .eq('tag_id', tagId)

    if (error) throw error
    return data ? data.map((pt) => pt.pages) : []
}

/**
 * Get all tags with page count
 */
export const getTagsWithCount = async (userId) => {
    const { data, error } = await supabase
        .from('tags')
        .select('*, page_tags(count)')
        .eq('user_id', userId)
        .order('name')

    if (error) throw error
    return data || []
}

/**
 * Predefined tag colors
 */
export const TAG_COLORS = [
    '#4db8a3', // highlight
    '#2d7a8e', // cyan
    '#3a9299', // teal
    '#1a4d6f', // blue
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#10b981', // green
    '#ef4444', // red
    '#ec4899', // pink
    '#6366f1', // indigo
]
