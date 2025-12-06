import { supabase } from '../lib/supabase'

/**
 * Get all pages for a workspace
 * @param {string} workspaceId - The workspace ID
 * @returns {Promise<Array>} Array of pages with block count
 */
export async function getPages(workspaceId) {
    const { data, error } = await supabase
        .from('pages')
        .select(`
      *,
      blocks(count)
    `)
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching pages:', error)
        throw error
    }

    // Transform the count data
    return data.map(page => ({
        ...page,
        block_count: page.blocks?.[0]?.count || 0,
        blocks: undefined, // Remove the blocks array
    }))
}

/**
 * Get a single page by ID
 * @param {string} pageId - The page ID
 * @returns {Promise<Object>} Page object
 */
export async function getPage(pageId) {
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

    if (error) {
        console.error('Error fetching page:', error)
        throw error
    }

    return data
}

/**
 * Create a new page
 * @param {string} workspaceId - The workspace ID
 * @param {Object} page - Page data (title, grid_type)
 * @returns {Promise<Object>} Created page
 */
export async function createPage(workspaceId, page) {
    const { data, error } = await supabase
        .from('pages')
        .insert([
            {
                workspace_id: workspaceId,
                title: page.title,
                grid_type: page.grid_type || 'none',
                color: page.color,
            },
        ])
        .select()
        .single()

    if (error) {
        console.error('Error creating page:', error)
        throw error
    }

    return data
}

/**
 * Update a page
 * @param {string} pageId - The page ID
 * @param {Object} updates - Fields to update (title, grid_type)
 * @returns {Promise<Object>} Updated page
 */
export async function updatePage(pageId, updates) {
    const { data, error } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', pageId)
        .select()
        .single()

    if (error) {
        console.error('Error updating page:', error)
        throw error
    }

    return data
}

/**
 * Delete a page (cascade deletes all blocks)
 * @param {string} pageId - The page ID
 * @returns {Promise<void>}
 */
export async function deletePage(pageId) {
    const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId)

    if (error) {
        console.error('Error deleting page:', error)
        throw error
    }
}
