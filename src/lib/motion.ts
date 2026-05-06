import type { Variants } from "framer-motion";

// ─── Easing Curves ────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 300, damping: 30 };

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
  }),
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay },
  }),
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
  }),
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay },
  }),
};

// ─── Stagger Container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

// ─── Card Micro-interactions ──────────────────────────────────────────────────
export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px rgba(11, 86, 213, 0.12)",
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
};

export const cardHoverSubtle: Variants = {
  rest: { y: 0 },
  hover: {
    y: -3,
    transition: { duration: 0.22, ease: EASE_OUT_EXPO },
  },
};

// ─── Icon Micro-interactions ──────────────────────────────────────────────────
export const iconHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.12,
    rotate: 5,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// ─── Floating Loop ────────────────────────────────────────────────────────────
export const floatY = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

export const floatCard = {
  y: [0, -8, 0],
  rotate: [-1, 0, -1],
  transition: {
    duration: 5,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

// ─── Viewport settings ────────────────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, margin: "-60px" } as const;
export const VIEWPORT_ONCE_SM = { once: true, margin: "-30px" } as const;
