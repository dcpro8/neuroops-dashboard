import { motion } from "motion/react";
import { AlertTriangle, ShieldCheck, Activity } from "lucide-react";

interface IntelligenceData {
  systemStatus: "STABLE" | "MODERATE" | "CRITICAL";
  avgRisk: number;
  insights: string[];
}

interface Props {
  data: IntelligenceData;
}

export const SystemIntelligence = ({ data }: Props) => {
  const { systemStatus, avgRisk, insights } = data;

  const getStatusConfig = () => {
    switch (systemStatus) {
      case "CRITICAL":
        return {
          color: "text-red-400",
          bg: "bg-red-500/10 border-red-500/30",
          pulse: "bg-red-400",
          icon: <AlertTriangle size={18} />,
        };
      case "MODERATE":
        return {
          color: "text-yellow-400",
          bg: "bg-yellow-500/10 border-yellow-500/30",
          pulse: "bg-yellow-400",
          icon: <Activity size={18} />,
        };
      default:
        return {
          color: "text-emerald-400",
          bg: "bg-emerald-500/10 border-emerald-500/30",
          pulse: "bg-emerald-400",
          icon: <ShieldCheck size={18} />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 p-6 rounded-2xl border backdrop-blur-xl ${config.bg}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`relative flex items-center gap-2 ${config.color}`}>
          
          {/* Pulse */}
          <span
            className={`absolute w-3 h-3 ml-0.5 rounded-full animate-ping opacity-60 ${config.pulse}`}
          />

          {/* Icon */}
          {config.icon}

          {/* Status Text */}
          <span>System Status: {systemStatus}</span>
        </div>

        <div className="text-sm text-gray-400">
          Avg Risk Score:{" "}
          <span className="text-white font-semibold">{avgRisk}</span>
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-300">
          {insights.map((insight, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-gray-500">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};