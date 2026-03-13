import { motion } from "motion/react";

interface RiskDistributionProps {
  low: number;
  moderate: number;
  high: number;
}

export const RiskDistribution = ({
  low,
  moderate,
  high,
}: RiskDistributionProps) => {
  const total = low + moderate + high;

  const lowPercent = total ? (low / total) * 100 : 0;
  const moderatePercent = total ? (moderate / total) * 100 : 0;
  const highPercent = total ? (high / total) * 100 : 0;

  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-white mb-4 tracking-wide">
        Risk Distribution
      </h2>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        {/* Bar */}
        <div className="w-full h-5 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${lowPercent}%` }}
            transition={{ duration: 0.6 }}
            className="bg-green-500"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${moderatePercent}%` }}
            transition={{ duration: 0.6 }}
            className="bg-yellow-500"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${highPercent}%` }}
            transition={{ duration: 0.6 }}
            className="bg-red-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
          <div className="text-green-400">
            <p className="font-semibold">{low}</p>
            <p className="text-gray-400">Low Risk</p>
          </div>

          <div className="text-yellow-400">
            <p className="font-semibold">{moderate}</p>
            <p className="text-gray-400">Moderate Risk</p>
          </div>

          <div className="text-red-400">
            <p className="font-semibold">{high}</p>
            <p className="text-gray-400">High Risk</p>
          </div>
        </div>
      </div>
    </div>
  );
};
