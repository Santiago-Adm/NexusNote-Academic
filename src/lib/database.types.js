/**
 * @typedef {Object} Workspace
 * @property {string} id - UUID
 * @property {string} user_id - UUID of the owner
 * @property {string} name - Workspace name
 * @property {string} [description] - Optional description
 * @property {string} icon - Emoji icon
 * @property {string} color - Hex color code
 * @property {string} created_at - ISO timestamp
 * @property {string} updated_at - ISO timestamp
 * @property {string} [deleted_at] - ISO timestamp (soft delete)
 */

/**
 * @typedef {Object} Page
 * @property {string} id - UUID
 * @property {string} workspace_id - UUID of parent workspace
 * @property {string} title - Page title
 * @property {'none'|'dots'|'squares'|'lines'} grid_type - Grid background type
 * @property {string} created_at - ISO timestamp
 * @property {string} updated_at - ISO timestamp
 */

/**
 * @typedef {Object} Block
 * @property {string} id - UUID
 * @property {string} page_id - UUID of parent page
 * @property {'text'|'code'|'task'|'image'|'pdf'|'canvas'} type - Block type
 * @property {Object} content - JSONB content
 * @property {number} position - Position in page
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {Object} Tag
 * @property {string} id - UUID
 * @property {string} user_id - UUID of the owner
 * @property {string} name - Tag name
 * @property {string} color - Hex color code
 * @property {string} created_at - ISO timestamp
 */

export { }
