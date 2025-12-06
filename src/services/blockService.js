import { supabase } from '../lib/supabase'

/**
 * Get all blocks for a page
 * @param {string} pageId - The page ID
 * @returns {Promise<Array>} Array of blocks ordered by position
 */
export async function getBlocks(pageId) {
    const { data, error } = await supabase
        .from('blocks')
        .select('*')
        .eq('page_id', pageId)
        .order('position', { ascending: true })

    if (error) {
        console.error('Error fetching blocks:', error)
        throw error
    }

    return data
}

/**
 * Create a new block
 * @param {string} pageId - The page ID
 * @param {Object} block - Block data (type, content, position)
 * @returns {Promise<Object>} Created block
 */
export async function createBlock(pageId, block) {
    const { data, error } = await supabase
        .from('blocks')
        .insert([
            {
                page_id: pageId,
                type: block.type,
                content: block.content,
                position: block.position,
            },
        ])
        .select()
        .single()

    if (error) {
        console.error('Error creating block:', error)
        throw error
    }

    return data
}

/**
 * Update a block's content
 * @param {string} blockId - The block ID
 * @param {Object} content - New content (JSONB)
 * @returns {Promise<Object>} Updated block
 */
export async function updateBlock(blockId, content) {
    const { data, error } = await supabase
        .from('blocks')
        .update({ content })
        .eq('id', blockId)
        .select()
        .single()

    if (error) {
        console.error('Error updating block:', error)
        throw error
    }

    return data
}

/**
 * Delete a block
 * @param {string} blockId - The block ID
 * @returns {Promise<void>}
 */
export async function deleteBlock(blockId) {
    const { error } = await supabase
        .from('blocks')
        .delete()
        .eq('id', blockId)

    if (error) {
        console.error('Error deleting block:', error)
        throw error
    }
}

/**
 * Reorder blocks after drag & drop
 * @param {string} pageId - The page ID
 * @param {Array<string>} blockIds - Array of block IDs in new order
 * @returns {Promise<void>}
 */
export async function reorderBlocks(pageId, blockIds) {
    // Update position for each block
    const updates = blockIds.map((blockId, index) => ({
        id: blockId,
        position: index,
    }))

    // Batch update all blocks
    const promises = updates.map(({ id, position }) =>
        supabase
            .from('blocks')
            .update({ position })
            .eq('id', id)
            .eq('page_id', pageId)
    )

    const results = await Promise.all(promises)

    // Check for errors
    const errors = results.filter(r => r.error)
    if (errors.length > 0) {
        console.error('Error reordering blocks:', errors)
        throw new Error('Failed to reorder blocks')
    }
}
