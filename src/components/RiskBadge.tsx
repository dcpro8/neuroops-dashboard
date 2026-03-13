import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface RiskBadgeProps {
  score: number;
}

export const RiskBadge = ({ score }: RiskBadgeProps) => {
  let colorClass = "";
  let glowClass = "";
  let label = "";

  if (score >= 8) {
    colorClass = "bg-red-500/10 text-red-400 border-red-500/20";
    glowClass = "shadow-[0_0_15px_rgba(239,68,68,0.3)]";
    label = "CRITICAL";
  } else if (score >= 5) {
    colorClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
    glowClass = "shadow-[0_0_15px_rgba(245,158,11,0.2)]";
    label = "MODERATE";
  } else {
    colorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    glowClass = "shadow-[0_0_15px_rgba(16,185,129,0.2)]";
    label = "LOW RISK";
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md",
        colorClass,
        glowClass
      )}
    >
      <div className={cn("w-2 h-2 rounded-full animate-pulse", 
        score >= 8 ? "bg-red-500" : score >= 5 ? "bg-amber-500" : "bg-emerald-500"
      )} />
      <span className="text-xs font-bold tracking-wider">{label} • {score}/10</span>
    </motion.div>
  );
};
