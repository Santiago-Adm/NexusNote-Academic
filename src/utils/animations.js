// Animation variants for Framer Motion
// Reusable animation configurations for consistent UX

// ============================================
// SPRING CONFIGURATIONS
// ============================================

export const SPRING_SMOOTH = {
    type: "spring",
    stiffness: 300,
    damping: 30
};

export const SPRING_BOUNCY = {
    type: "spring",
    stiffness: 400,
    damping: 25
};

export const SPRING_SLOW = {
    type: "spring",
    stiffness: 200,
    damping: 35
};

// ============================================
// EASING FUNCTIONS
// ============================================

export const EASE_OUT = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
};

export const EASE_IN_OUT = {
    duration: 0.3,
    ease: [0.4, 0, 0.6, 1]
};

export const EASE_FAST = {
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1]
};

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: EASE_OUT }
};

export const fadeOut = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: EASE_OUT }
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: SPRING_SMOOTH }
};

export const slideDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: SPRING_SMOOTH }
};

export const slideLeft = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: SPRING_SMOOTH }
};

export const slideRight = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: SPRING_SMOOTH }
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: SPRING_SMOOTH }
};

export const scaleOut = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.95, transition: EASE_OUT }
};

// ============================================
// HOVER & TAP EFFECTS
// ============================================

export const hoverScale = {
    scale: 1.05,
    transition: EASE_FAST
};

export const hoverBrightness = {
    filter: "brightness(1.15)",
    transition: EASE_FAST
};

export const tapScale = {
    scale: 0.95,
    transition: EASE_FAST
};

// ============================================
// STAGGER CONTAINERS
// ============================================

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const staggerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0
        }
    }
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: SPRING_SMOOTH
    },
    hover: {
        scale: 1.02,
        filter: "brightness(1.1)",
        boxShadow: "0 20px 40px rgba(77, 184, 163, 0.3)",
        transition: EASE_FAST
    },
    tap: {
        scale: 0.98,
        transition: SPRING_BOUNCY
    }
};

// ============================================
// MODAL ANIMATIONS
// ============================================

export const modalOverlay = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const modalContent = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: SPRING_SMOOTH
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: EASE_OUT
    }
};

// ============================================
// BLOCK ANIMATIONS
// ============================================

export const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: {
            ...SPRING_SMOOTH,
            delay: custom * 0.1 // Stagger based on position
        }
    }),
    exit: {
        opacity: 0,
        x: 100,
        transition: EASE_OUT
    }
};

export const blockDrag = {
    scale: 1.05,
    rotate: 2,
    boxShadow: "0 20px 40px rgba(77, 184, 163, 0.4)",
    cursor: "grabbing"
};

// ============================================
// MENU ANIMATIONS
// ============================================

export const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            ...SPRING_SMOOTH,
            staggerChildren: 0.05
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: EASE_FAST
    }
};

export const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

// ============================================
// FLOATING ANIMATION
// ============================================

export const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// ============================================
// PULSE ANIMATION
// ============================================

export const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// ============================================
// SHAKE ANIMATION (for errors)
// ============================================

export const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
        duration: 0.5,
        ease: "easeInOut"
    }
};

// ============================================
// GLOW ANIMATION
// ============================================

export const glowAnimation = {
    boxShadow: [
        "0 0 0 rgba(77, 184, 163, 0)",
        "0 0 20px rgba(77, 184, 163, 0.5)",
        "0 0 0 rgba(77, 184, 163, 0)"
    ],
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get stagger delay for list items
 * @param {number} index - Item index
 * @param {number} delay - Delay per item (default: 0.1s)
 */
export const getStaggerDelay = (index, delay = 0.1) => index * delay;

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get transition based on user preference
 * @param {object} transition - Default transition
 */
export const getTransition = (transition) => {
    return prefersReducedMotion() ? { duration: 0 } : transition;
};
