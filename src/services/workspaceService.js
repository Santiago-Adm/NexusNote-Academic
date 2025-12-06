import { supabase } from '../lib/supabase'

/**
 * Get all workspaces for a user (excluding soft-deleted ones)
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of workspaces
 */
export async function getWorkspaces(userId) {
    try {
        const { data, error } = await supabase
            .from('workspaces')
            .select('*, pages(count)')
            .eq('user_id', userId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching workspaces:', error)
        throw error
    }
}

/**
 * Create a new workspace
 * @param {Object} workspace - Workspace data
 * @returns {Promise<Object>} Created workspace
 */
export async function createWorkspace(workspace) {
    try {
        const { data, error } = await supabase
            .from('workspaces')
            .insert([workspace])
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creating workspace:', error)
        throw error
    }
}

/**
 * Update a workspace
 * @param {string} id - Workspace ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated workspace
 */
export async function updateWorkspace(id, updates) {
    try {
        const { data, error } = await supabase
            .from('workspaces')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error updating workspace:', error)
        throw error
    }
}

/**
 * Soft delete a workspace (sets deleted_at timestamp)
 * @param {string} id - Workspace ID
 * @returns {Promise<Object>} Deleted workspace
 */
export async function deleteWorkspace(id) {
    try {
        const { data, error } = await supabase
            .from('workspaces')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error deleting workspace:', error)
        throw error
    }
}

/**
 * Permanently delete a workspace (hard delete)
 * @param {string} id - Workspace ID
 * @returns {Promise<void>}
 */
export async function permanentlyDeleteWorkspace(id) {
    try {
        const { error } = await supabase
            .from('workspaces')
            .delete()
            .eq('id', id)

        if (error) throw error
    } catch (error) {
        console.error('Error permanently deleting workspace:', error)
        throw error
    }
}

/**
 * Restore a soft-deleted workspace
 * @param {string} id - Workspace ID
 * @returns {Promise<Object>} Restored workspace
 */
export async function restoreWorkspace(id) {
    try {
        const { data, error } = await supabase
            .from('workspaces')
            .update({ deleted_at: null })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error restoring workspace:', error)
        throw error
    }
}

/**
 * Get all pages in a workspace
 * @param {string} workspaceId - Workspace ID
 * @returns {Promise<Array>} Array of pages
 */
export async function getWorkspacePages(workspaceId) {
    try {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('workspace_id', workspaceId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching pages:', error)
        throw error
    }
}

/**
 * Get a single workspace by ID
 * @param {string} id - Workspace ID
 * @returns {Promise<Object>} Workspace
 */
export async function getWorkspace(id) {
    try {
        const { data, error } = await supabase
            .from('workspaces')
            .select('*')
            .eq('id', id)
            .is('deleted_at', null)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching workspace:', error)
        throw error
    }
}
