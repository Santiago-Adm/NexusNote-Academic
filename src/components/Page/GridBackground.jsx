import { motion } from 'framer-motion'
import { fadeIn } from '../../utils/animations'

export default function GridBackground({ gridType }) {
    if (gridType === 'none') return null

    const patterns = {
        dots: (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#2d7a8e" opacity="0.2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots-pattern)" />
            </svg>
        ),
        squares: (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="squares-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2d7a8e" strokeWidth="0.5" opacity="0.2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#squares-pattern)" />
            </svg>
        ),
        lines: (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="lines-pattern" x="0" y="0" width="100" height="30" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="100" y2="0" stroke="#2d7a8e" strokeWidth="0.5" opacity="0.2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#lines-pattern)" />
            </svg>
        ),
    }

    return (
        <motion.div
            className="fixed inset-0 z-0"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
        >
            {patterns[gridType]}
        </motion.div>
    )
}
