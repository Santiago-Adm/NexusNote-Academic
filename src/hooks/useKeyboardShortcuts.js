import { useState, useEffect } from 'react'

/**
 * Hook to handle global keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to handlers
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
export function useKeyboardShortcuts(shortcuts, enabled = true) {
    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event) => {
            // Build key combination string
            const keys = []
            if (event.ctrlKey || event.metaKey) keys.push('Ctrl')
            if (event.shiftKey) keys.push('Shift')
            if (event.altKey) keys.push('Alt')

            // Add the actual key
            let key = event.key
            if (key === ' ') key = 'Space'
            if (key === 'ArrowUp') key = '↑'
            if (key === 'ArrowDown') key = '↓'
            if (key === 'ArrowLeft') key = '←'
            if (key === 'ArrowRight') key = '→'

            if (!['Control', 'Shift', 'Alt', 'Meta'].includes(key)) {
                keys.push(key)
            }

            const combination = keys.join('+')

            // Check if this combination has a handler
            if (shortcuts[combination]) {
                event.preventDefault()
                shortcuts[combination](event)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [shortcuts, enabled])
}

/**
 * Hook to detect specific key press
 * @param {string} targetKey - Key to detect
 * @param {Function} callback - Function to call when key is pressed
 * @param {boolean} enabled - Whether detection is enabled
 */
export function useKeyPress(targetKey, callback, enabled = true) {
    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event) => {
            if (event.key === targetKey) {
                callback(event)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [targetKey, callback, enabled])
}
