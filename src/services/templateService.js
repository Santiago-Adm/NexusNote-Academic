import { supabase } from '../lib/supabase'

/**
 * Get all templates (user's own + public)
 */
export const getTemplates = async (userId) => {
    const { data, error } = await supabase
        .from('templates')
        .select('*')
        .or(`user_id.eq.${userId},is_public.eq.true`)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Create a new template
 */
export const createTemplate = async (template) => {
    const { data, error } = await supabase
        .from('templates')
        .insert([template])
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Update existing template
 */
export const updateTemplate = async (id, updates) => {
    const { data, error } = await supabase
        .from('templates')
        .update({ ...updates, updated_at: new Date() })
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Delete template
 */
export const deleteTemplate = async (id) => {
    const { error } = await supabase.from('templates').delete().eq('id', id)

    if (error) throw error
}

/**
 * Create page from template
 */
export const createPageFromTemplate = async (templateId, workspaceId, title) => {
    // Get template
    const { data: template, error: templateError } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single()

    if (templateError) throw templateError

    // Create page
    const { data: page, error: pageError } = await supabase
        .from('pages')
        .insert([
            {
                workspace_id: workspaceId,
                title: title || template.name,
                grid_type: template.grid_type || 'none',
            },
        ])
        .select()
        .single()

    if (pageError) throw pageError

    // Create blocks from template
    if (template.blocks && template.blocks.length > 0) {
        const blocksToInsert = template.blocks.map((block, index) => ({
            page_id: page.id,
            type: block.type,
            content: block.content,
            position: index,
        }))

        const { error: blocksError } = await supabase.from('blocks').insert(blocksToInsert)

        if (blocksError) throw blocksError
    }

    return page
}

/**
 * Create template from existing page
 */
export const createTemplateFromPage = async (pageId, templateData) => {
    // Get page with blocks
    const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*, blocks(*)')
        .eq('id', pageId)
        .single()

    if (pageError) throw pageError

    // Create template
    const template = {
        ...templateData,
        grid_type: page.grid_type,
        blocks: page.blocks
            .sort((a, b) => a.position - b.position)
            .map((block) => ({
                type: block.type,
                content: block.content,
            })),
    }

    return await createTemplate(template)
}

/**
 * Default templates (predefined)
 */
export const DEFAULT_TEMPLATES = [
    {
        name: 'Notas de Clase',
        description: 'Estructura para tomar notas durante una clase',
        icon: '📝',
        category: 'academic',
        is_public: true,
        grid_type: 'lines',
        blocks: [
            {
                type: 'text',
                content: { text: '# Clase: [Nombre de la materia]\n## Fecha: [DD/MM/YYYY]' },
            },
            { type: 'text', content: { text: '### Objetivos de la clase\n- ' } },
            { type: 'text', content: { text: '### Contenido principal\n' } },
            {
                type: 'code',
                content: { code: '// Ejemplos de código', language: 'javascript' },
            },
            { type: 'text', content: { text: '### Preguntas y dudas\n- ' } },
            {
                type: 'task',
                content: {
                    tasks: [{ id: '1', text: 'Revisar material complementario', completed: false }],
                },
            },
        ],
    },
    {
        name: 'Proyecto de Software',
        description: 'Planificación y documentación de proyecto',
        icon: '💻',
        category: 'project',
        is_public: true,
        grid_type: 'squares',
        blocks: [
            {
                type: 'text',
                content: { text: '# Proyecto: [Nombre]\n## Stack Tecnológico\n' },
            },
            {
                type: 'task',
                content: {
                    tasks: [
                        { id: '1', text: 'Setup del proyecto', completed: false },
                        { id: '2', text: 'Diseño de arquitectura', completed: false },
                        { id: '3', text: 'Implementación', completed: false },
                        { id: '4', text: 'Testing', completed: false },
                        { id: '5', text: 'Deploy', completed: false },
                    ],
                },
            },
            { type: 'text', content: { text: '## Diagrama de arquitectura' } },
            {
                type: 'canvas',
                content: { dataURL: null, gridType: 'squares', width: 800, height: 600 },
            },
            {
                type: 'code',
                content: { code: '// Código principal', language: 'javascript' },
            },
        ],
    },
    {
        name: 'Investigación',
        description: 'Estructura para documentar investigación',
        icon: '🔬',
        category: 'academic',
        is_public: true,
        grid_type: 'none',
        blocks: [
            { type: 'text', content: { text: '# Investigación: [Tema]\n## Hipótesis\n' } },
            { type: 'text', content: { text: '## Metodología\n' } },
            { type: 'text', content: { text: '## Resultados\n' } },
            { type: 'image', content: { url: null, path: null, caption: 'Gráficos y datos' } },
            { type: 'text', content: { text: '## Conclusiones\n' } },
            { type: 'text', content: { text: '## Referencias\n1. ' } },
        ],
    },
    {
        name: 'Reunión',
        description: 'Acta de reunión con agenda y acuerdos',
        icon: '📅',
        category: 'meeting',
        is_public: true,
        grid_type: 'none',
        blocks: [
            {
                type: 'text',
                content: { text: '# Reunión: [Título]\n**Fecha:** [DD/MM/YYYY]\n**Participantes:** ' },
            },
            { type: 'text', content: { text: '## Agenda\n1. ' } },
            { type: 'text', content: { text: '## Notas\n' } },
            {
                type: 'task',
                content: {
                    tasks: [{ id: '1', text: 'Acción a tomar', completed: false }],
                },
            },
            { type: 'text', content: { text: '## Próximos pasos\n' } },
        ],
    },
    {
        name: 'Diario Personal',
        description: 'Entrada de diario con reflexiones',
        icon: '✨',
        category: 'personal',
        is_public: true,
        grid_type: 'none',
        blocks: [
            { type: 'text', content: { text: '# [Fecha]\n\n## ¿Cómo me siento hoy?\n' } },
            { type: 'text', content: { text: '## Lo mejor del día\n' } },
            { type: 'text', content: { text: '## Aprendizajes\n' } },
            {
                type: 'task',
                content: {
                    tasks: [{ id: '1', text: 'Objetivo para mañana', completed: false }],
                },
            },
        ],
    },
]
