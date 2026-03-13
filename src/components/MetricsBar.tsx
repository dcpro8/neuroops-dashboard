import { motion } from "motion/react";
import { AlertTriangle, Activity, GitPullRequest, Layers } from "lucide-react";

interface MetricsProps {
  totalPRs: number;
  highRisk: number;
  moderateRisk: number;
  lowRisk: number;
  averageRisk: number;
  uniqueRepos: number;
}

const MetricCard = ({
  label,
  value,
  icon,
  glowColor,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  glowColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group cursor-pointer"
    >
      {/* Animated Glow */}
      <div
        className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none ${glowColor}`}
      />

      {/* Soft radial hover light */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
            {label}
          </p>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-white"
          >
            {value}
          </motion.h3>
        </div>

        {/* Animated Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-emerald-400 opacity-80"
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const MetricsBar = ({
  totalPRs,
  highRisk,
  moderateRisk,
  lowRisk,
  averageRisk,
  uniqueRepos,
}: MetricsProps) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          System Intelligence Snapshot
        </h2>
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          Live Analytics
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <MetricCard
          label="Total Pull Requests"
          value={totalPRs}
          icon={<GitPullRequest size={20} className="animate-pulse" />}
          glowColor="bg-gradient-to-r from-emerald-500/20 to-transparent blur-xl"
        />

        <MetricCard
          label="High Risk PRs"
          value={highRisk}
          icon={<AlertTriangle size={20} className="animate-pulse"/>}
          glowColor="bg-gradient-to-r from-red-500/20 to-transparent blur-xl"
        />

        <MetricCard
          label="Moderate Risk PRs"
          value={moderateRisk}
          icon={<Activity size={20} className="animate-pulse"/>}
          glowColor="bg-gradient-to-r from-yellow-500/20 to-transparent blur-xl"
        />

        <MetricCard
          label="Low Risk PRs"
          value={lowRisk}
          icon={<Activity size={20} className="animate-pulse"/>}
          glowColor="bg-gradient-to-r from-green-500/20 to-transparent blur-xl"
        />

        <MetricCard
          label="Average Risk Score"
          value={averageRisk}
          icon={<Layers size={20} className="animate-pulse"/>}
          glowColor="bg-gradient-to-r from-cyan-500/20 to-transparent blur-xl"
        />

        <MetricCard
          label="Unique Repositories"
          value={uniqueRepos}
          icon={<Layers size={20} className="animate-pulse"/>}
          glowColor="bg-gradient-to-r from-purple-500/20 to-transparent blur-xl"
        />
      </div>
    </div>
  );
};