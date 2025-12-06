// This file is deprecated and replaced by react-hot-toast
// Import toast from 'react-hot-toast' instead

import toast, { Toaster } from 'react-hot-toast';

// Re-export for backward compatibility
export { toast, Toaster };

// Custom toast styles matching NexusNote theme
export const toastConfig = {
    success: (message) => toast.success(message, {
        style: {
            background: 'rgba(77, 184, 163, 0.9)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(77, 184, 163, 0.3)',
        },
        iconTheme: {
            primary: '#4db8a3',
            secondary: 'white',
        },
        duration: 3000,
    }),

    error: (message) => toast.error(message, {
        style: {
            background: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
        },
        iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
        },
        duration: 4000,
    }),

    info: (message) => toast(message, {
        icon: 'ℹ️',
        style: {
            background: 'rgba(45, 122, 142, 0.9)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(45, 122, 142, 0.3)',
        },
        duration: 3000,
    }),

    loading: (message) => toast.loading(message, {
        style: {
            background: 'rgba(13, 33, 55, 0.9)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(77, 184, 163, 0.3)',
        },
    }),
};

// Backward compatible hook
export const useToast = () => {
    return {
        showToast: (message, type = 'info') => {
            switch (type) {
                case 'success':
                    return toastConfig.success(message);
                case 'error':
                    return toastConfig.error(message);
                case 'info':
                    return toastConfig.info(message);
                default:
                    return toast(message);
            }
        },
        toasts: [], // Not needed with react-hot-toast
    };
};

export default Toaster;
