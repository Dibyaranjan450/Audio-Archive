import React from "react";
import { motion } from "framer-motion";

function MotionSpringAnimation({ children, style }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      style={{ ...style }}
    >
      {children}
    </motion.div>
  );
}

function MotionLoaderAnimation({ children, style }) {
  const expandVariants = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        type: "spring",
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={expandVariants}
      style={{
        transformOrigin: "center left",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function BackDrop({ children }) {
  return (
    <div className="fixed top-0 left-0 z-[1] w-full h-full flex justify-center items-center bg-[#121212] bg-opacity-50">
      {children}
    </div>
  );
}

export default MotionSpringAnimation;
export { BackDrop, MotionLoaderAnimation };
