import { WORKSPACE_COLORS } from '../../utils/constants'

export default function ColorPicker({ selected, onSelect }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-accent-teal">
                Color del Workspace
            </label>
            <div className="flex gap-3">
                {WORKSPACE_COLORS.map(({ color, label }) => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => onSelect(color)}
                        className={`
              w-12 h-12 rounded-lg transition-all duration-300
              hover:scale-110 hover:shadow-lg hover:shadow-highlight/50
              ${selected === color
                                ? 'border-4 border-white scale-110 shadow-xl shadow-highlight/60'
                                : 'border-2 border-accent-blue/30'
                            }
            `}
                        style={{ backgroundColor: color }}
                        title={label}
                    />
                ))}
            </div>
        </div>
    )
}
