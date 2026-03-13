import { PRData, PRCard } from "./PRCard";
import { motion } from "motion/react";

interface PRListProps {
  prs: PRData[];
  loading: boolean;
}

export const PRList = ({ prs, loading }: PRListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-40 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
        ))}
      </div>
    );
  }

  if (!Array.isArray(prs) || prs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No pull requests found matching your criteria.</p>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 gap-6"
    >
      {prs.map((pr, index) => (
        <PRCard key={pr._id} pr={pr} index={index} />
      ))}
    </motion.div>
  );
};
