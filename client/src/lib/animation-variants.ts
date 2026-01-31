import { Variants } from "framer-motion";

// Page transition variants
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
        },
    },
};

// Fade in variants
export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

// Slide up variants
export const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Staggered container for lists
export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// Staggered item variant
export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Scale on hover
export const scaleOnHoverVariants: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
};

// Button hover/tap variants
export const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.95,
        transition: { duration: 0.1 },
    },
};

// Drawer/Modal slide variants
export const drawerVariants: Variants = {
    hidden: {
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

// Modal overlay
export const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 },
    },
};

// Modal content
export const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: 0.2,
        },
    },
};

// Accordion content
export const accordionVariants: Variants = {
    hidden: {
        height: 0,
        opacity: 0,
        transition: {
            height: { duration: 0.3 },
            opacity: { duration: 0.2 },
        },
    },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            height: { duration: 0.3 },
            opacity: { duration: 0.3, delay: 0.1 },
        },
    },
};

// Navbar scroll animation
export const navbarVariants: Variants = {
    hidden: { y: -100 },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
    },
};

// Card flip effect
export const cardFlipVariants: Variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
};

// Success checkmark animation
export const checkmarkVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.2 },
        },
    },
};

// Shake animation for errors
export const shakeVariants: Variants = {
    shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
    },
};

// Pulse animation
export const pulseVariants: Variants = {
    pulse: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 0.3,
            repeat: 2,
        },
    },
};
