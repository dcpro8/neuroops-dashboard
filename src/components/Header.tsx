import { motion } from "motion/react";

export const Header = () => {
  return (
    <header className="relative w-full py-8 mb-8">
      <div className="flex flex-col items-start justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2"
        >
          NeuroOps <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-gray-400 text-lg font-medium tracking-wide"
        >
          DevOps Copilot & Risk Intelligence
        </motion.p>
      </div>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-transparent mt-8 origin-left"
      />
    </header>
  );
};
