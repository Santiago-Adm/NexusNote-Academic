import { WORKSPACE_EMOJIS } from '../../utils/constants'

export default function EmojiPicker({ selected, onSelect }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-accent-teal">
                Icono del Workspace
            </label>
            <div className="grid grid-cols-6 gap-2 bg-bg-secondary/50 p-3 rounded-lg border border-accent-blue/20">
                {WORKSPACE_EMOJIS.map(({ emoji, label }) => (
                    <button
                        key={emoji}
                        type="button"
                        onClick={() => onSelect(emoji)}
                        className={`
              p-3 text-3xl rounded-lg transition-all duration-300
              hover:scale-110 hover:bg-highlight/20
              ${selected === emoji
                                ? 'bg-highlight/20 border-2 border-highlight scale-110 shadow-lg shadow-highlight/30'
                                : 'bg-bg-primary border-2 border-accent-blue/30 hover:border-highlight/50'
                            }
            `}
                        title={label}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}
