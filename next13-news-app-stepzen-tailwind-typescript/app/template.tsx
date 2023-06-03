"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

export default function Template({ children }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
