import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import WorkspaceDetail from './pages/WorkspaceDetail'
import PageEditor from './pages/PageEditor'
import CommandPalette from './components/UI/CommandPalette'
import ShortcutsModal from './components/UI/ShortcutsModal'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    'Ctrl+K': (e) => {
      e.preventDefault()
      setIsCommandPaletteOpen(true)
    },
    'Cmd+K': (e) => {
      e.preventDefault()
      setIsCommandPaletteOpen(true)
    },
    'Ctrl+/': (e) => {
      e.preventDefault()
      setIsShortcutsModalOpen(true)
    },
    'Ctrl+?': (e) => {
      e.preventDefault()
      setIsShortcutsModalOpen(true)
    },
  })

  const handleCommand = (action) => {
    console.log('Command executed:', action)
    // Commands will be handled by individual pages
    // This is just the global handler
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspace/:id" element={<WorkspaceDetail />} />
        <Route path="/workspace/:workspaceId/page/:pageId" element={<PageEditor />} />
      </Routes>

      {/* Global Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onCommand={handleCommand}
      />

      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </Router>
  )
}

export default App
