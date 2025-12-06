-- =====================================================
-- NexusNote Academic - Database Schema
-- Workspaces System with Soft Delete Support
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: workspaces
-- =====================================================
CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT '📚',
    color TEXT DEFAULT '#2d7a8e',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_workspaces_user_id ON workspaces(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_deleted_at ON workspaces(deleted_at);

-- =====================================================
-- TABLE: pages
-- =====================================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    grid_type TEXT DEFAULT 'none' CHECK (grid_type IN ('none', 'dots', 'squares', 'lines')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_pages_workspace_id ON pages(workspace_id);

-- =====================================================
-- TABLE: blocks
-- =====================================================
CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('text', 'code', 'task', 'image', 'pdf', 'canvas')),
    content JSONB NOT NULL DEFAULT '{}',
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blocks_page_id ON blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_blocks_position ON blocks(page_id, position);

-- =====================================================
-- TABLE: tags
-- =====================================================
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#4db8a3',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, name)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_tags_user_id ON tags(user_id);

-- =====================================================
-- FUNCTION: Update timestamp automatically
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS: Auto-update timestamps
-- =====================================================
DROP TRIGGER IF EXISTS update_workspaces_updated_at ON workspaces;
CREATE TRIGGER update_workspaces_updated_at
    BEFORE UPDATE ON workspaces
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- WORKSPACES POLICIES (with soft delete support)
-- =====================================================

-- Users can only see their own non-deleted workspaces
DROP POLICY IF EXISTS "Users can view own non-deleted workspaces" ON workspaces;
CREATE POLICY "Users can view own non-deleted workspaces"
    ON workspaces FOR SELECT
    USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Users can insert their own workspaces
DROP POLICY IF EXISTS "Users can insert own workspaces" ON workspaces;
CREATE POLICY "Users can insert own workspaces"
    ON workspaces FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own workspaces
DROP POLICY IF EXISTS "Users can update own workspaces" ON workspaces;
CREATE POLICY "Users can update own workspaces"
    ON workspaces FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete (soft delete) their own workspaces
DROP POLICY IF EXISTS "Users can delete own workspaces" ON workspaces;
CREATE POLICY "Users can delete own workspaces"
    ON workspaces FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- PAGES POLICIES
-- =====================================================

-- Users can view pages in their workspaces
DROP POLICY IF EXISTS "Users can view pages in own workspaces" ON pages;
CREATE POLICY "Users can view pages in own workspaces"
    ON pages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE workspaces.id = pages.workspace_id
            AND workspaces.user_id = auth.uid()
            AND workspaces.deleted_at IS NULL
        )
    );

-- Users can insert pages in their workspaces
DROP POLICY IF EXISTS "Users can insert pages in own workspaces" ON pages;
CREATE POLICY "Users can insert pages in own workspaces"
    ON pages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE workspaces.id = pages.workspace_id
            AND workspaces.user_id = auth.uid()
        )
    );

-- Users can update pages in their workspaces
DROP POLICY IF EXISTS "Users can update pages in own workspaces" ON pages;
CREATE POLICY "Users can update pages in own workspaces"
    ON pages FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE workspaces.id = pages.workspace_id
            AND workspaces.user_id = auth.uid()
        )
    );

-- Users can delete pages in their workspaces
DROP POLICY IF EXISTS "Users can delete pages in own workspaces" ON pages;
CREATE POLICY "Users can delete pages in own workspaces"
    ON pages FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE workspaces.id = pages.workspace_id
            AND workspaces.user_id = auth.uid()
        )
    );

-- =====================================================
-- BLOCKS POLICIES
-- =====================================================

-- Users can view blocks in their pages
DROP POLICY IF EXISTS "Users can view blocks in own pages" ON blocks;
CREATE POLICY "Users can view blocks in own pages"
    ON blocks FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM pages
            JOIN workspaces ON workspaces.id = pages.workspace_id
            WHERE pages.id = blocks.page_id
            AND workspaces.user_id = auth.uid()
            AND workspaces.deleted_at IS NULL
        )
    );

-- Users can insert blocks in their pages
DROP POLICY IF EXISTS "Users can insert blocks in own pages" ON blocks;
CREATE POLICY "Users can insert blocks in own pages"
    ON blocks FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM pages
            JOIN workspaces ON workspaces.id = pages.workspace_id
            WHERE pages.id = blocks.page_id
            AND workspaces.user_id = auth.uid()
        )
    );

-- Users can update blocks in their pages
DROP POLICY IF EXISTS "Users can update blocks in own pages" ON blocks;
CREATE POLICY "Users can update blocks in own pages"
    ON blocks FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM pages
            JOIN workspaces ON workspaces.id = pages.workspace_id
            WHERE pages.id = blocks.page_id
            AND workspaces.user_id = auth.uid()
        )
    );

-- Users can delete blocks in their pages
DROP POLICY IF EXISTS "Users can delete blocks in own pages" ON blocks;
CREATE POLICY "Users can delete blocks in own pages"
    ON blocks FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM pages
            JOIN workspaces ON workspaces.id = pages.workspace_id
            WHERE pages.id = blocks.page_id
            AND workspaces.user_id = auth.uid()
        )
    );

-- =====================================================
-- TAGS POLICIES
-- =====================================================

-- Users can view their own tags
DROP POLICY IF EXISTS "Users can view own tags" ON tags;
CREATE POLICY "Users can view own tags"
    ON tags FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own tags
DROP POLICY IF EXISTS "Users can insert own tags" ON tags;
CREATE POLICY "Users can insert own tags"
    ON tags FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own tags
DROP POLICY IF EXISTS "Users can update own tags" ON tags;
CREATE POLICY "Users can update own tags"
    ON tags FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own tags
DROP POLICY IF EXISTS "Users can delete own tags" ON tags;
CREATE POLICY "Users can delete own tags"
    ON tags FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the setup:
-- SELECT * FROM workspaces;
-- SELECT * FROM pages;
-- SELECT * FROM blocks;
-- SELECT * FROM tags;
