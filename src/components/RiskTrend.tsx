import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

interface RiskTrendPoint {
  date: string;
  avgRisk: number;
  count: number;
}

interface RiskTrendProps {
  data: RiskTrendPoint[];
  period: number;
  onPeriodChange: (days: number) => void;
}

export const RiskTrend = ({ data, period, onPeriodChange }: RiskTrendProps) => {
  // 🧠 Detect spike
  const { isSpike, spikePercentage } = useMemo(() => {
    if (!data || data.length < 3) {
      return { isSpike: false, spikePercentage: 0 };
    }

    const latest = data[data.length - 1].avgRisk;

    const previousData = data.slice(0, -1);
    const previousAverage =
      previousData.reduce((sum, d) => sum + d.avgRisk, 0) / previousData.length;

    if (previousAverage === 0) {
      return { isSpike: false, spikePercentage: 0 };
    }

    const increase = ((latest - previousAverage) / previousAverage) * 100;

    return {
      isSpike: increase > 30,
      spikePercentage: Math.round(increase),
    };
  }, [data]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          Risk Trend (Last {period} Days)
        </h2>

        <div className="flex gap-2 text-xs">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              onClick={() => onPeriodChange(days)}
              className={`px-3 py-1 rounded-lg border transition ${
                period === days
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "text-gray-400 border-white/10 hover:text-white hover:bg-white/5"
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>

      {/* 🚨 Spike Banner */}
      {isSpike && (
        <div className="mb-4 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          ⚠️ Risk spike detected: {spikePercentage}% increase vs recent average
        </div>
      )}

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />

              <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 12 }} />

              <YAxis
                domain={[0, 10]}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#fff" }}
              />

              <Line
                type="monotone"
                dataKey="avgRisk"
                stroke={isSpike ? "#EF4444" : "#10B981"}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
