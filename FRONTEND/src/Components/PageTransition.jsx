import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
/*Purpose: Creates a smooth animation when moving between pages/components using Framer Motion.

motion → Framer Motion feature used to animate React elements.
children → represents the page/content placed inside PageTransition.
initial → starting animation state: slightly down + invisible.
animate → final state: fully visible and moves to normal position.
transition → controls how the animation happens.
duration: 0.35 → animation takes 0.35 seconds.
ease: "easeOut" → animation starts faster and slows down smoothly at the end.
{children} → displays the actual page content.*/