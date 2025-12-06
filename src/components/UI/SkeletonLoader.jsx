import { motion } from 'framer-motion';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
    const shimmer = {
        backgroundImage: 'linear-gradient(90deg, #0d2137 0%, #2d7a8e 50%, #0d2137 100%)',
        backgroundSize: '200% 100%',
    };

    const shimmerAnimation = {
        backgroundPosition: ['200% 0', '-200% 0'],
    };

    const shimmerTransition = {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
    };

    // Workspace Card Skeleton
    const WorkspaceCardSkeleton = () => (
        <motion.div
            className="p-6 rounded-lg border border-accent-blue/30"
            style={{
                background: 'linear-gradient(145deg, #0d2137, #1a4d6f)',
            }}
        >
            {/* Icon */}
            <motion.div
                className="w-16 h-16 rounded-lg mb-4"
                style={shimmer}
                animate={shimmerAnimation}
                transition={shimmerTransition}
            />

            {/* Title */}
            <motion.div
                className="h-6 rounded mb-2"
                style={{ ...shimmer, width: '70%' }}
                animate={shimmerAnimation}
                transition={shimmerTransition}
            />

            {/* Description */}
            <motion.div
                className="h-4 rounded mb-4"
                style={{ ...shimmer, width: '90%' }}
                animate={shimmerAnimation}
                transition={shimmerTransition}
            />

            {/* Badge */}
            <motion.div
                className="h-6 rounded"
                style={{ ...shimmer, width: '40%' }}
                animate={shimmerAnimation}
                transition={shimmerTransition}
            />
        </motion.div>
    );

    // Block Skeleton
    const BlockSkeleton = ({ height = 200 }) => (
        <motion.div
            className="p-6 rounded-lg border border-accent-cyan/30"
            style={{
                background: 'rgba(13, 33, 55, 0.5)',
                height: `${height}px`,
            }}
        >
            {/* Header */}
            <motion.div
                className="h-4 rounded mb-4"
                style={{ ...shimmer, width: '30%' }}
                animate={shimmerAnimation}
                transition={shimmerTransition}
            />

            {/* Content lines */}
            <div className="space-y-2">
                <motion.div
                    className="h-3 rounded"
                    style={{ ...shimmer, width: '100%' }}
                    animate={shimmerAnimation}
                    transition={shimmerTransition}
                />
                <motion.div
                    className="h-3 rounded"
                    style={{ ...shimmer, width: '95%' }}
                    animate={shimmerAnimation}
                    transition={shimmerTransition}
                />
                <motion.div
                    className="h-3 rounded"
                    style={{ ...shimmer, width: '85%' }}
                    animate={shimmerAnimation}
                    transition={shimmerTransition}
                />
            </div>
        </motion.div>
    );

    // Page List Skeleton
    const PageListSkeleton = () => (
        <motion.div
            className="p-4 rounded-lg border border-accent-blue/30 mb-3"
            style={{
                background: 'linear-gradient(145deg, #0d2137, #2d7a8e)',
            }}
        >
            <div className="flex items-center gap-3">
                {/* Icon */}
                <motion.div
                    className="w-10 h-10 rounded"
                    style={shimmer}
                    animate={shimmerAnimation}
                    transition={shimmerTransition}
                />

                <div className="flex-1">
                    {/* Title */}
                    <motion.div
                        className="h-5 rounded mb-2"
                        style={{ ...shimmer, width: '60%' }}
                        animate={shimmerAnimation}
                        transition={shimmerTransition}
                    />

                    {/* Meta */}
                    <motion.div
                        className="h-3 rounded"
                        style={{ ...shimmer, width: '40%' }}
                        animate={shimmerAnimation}
                        transition={shimmerTransition}
                    />
                </div>
            </div>
        </motion.div>
    );

    // Render based on type
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return <WorkspaceCardSkeleton />;
            case 'block':
                return <BlockSkeleton />;
            case 'page':
                return <PageListSkeleton />;
            default:
                return <WorkspaceCardSkeleton />;
        }
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>
                    {renderSkeleton()}
                </div>
            ))}
        </>
    );
}
