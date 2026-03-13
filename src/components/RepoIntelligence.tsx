import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface RepoStat {
  repo: string;
  totalPRs: number;
  averageRisk: number;
  highRiskCount: number;
}

interface RepoIntelligenceProps {
  data: RepoStat[];
}

export const RepoIntelligence = ({ data }: RepoIntelligenceProps) => {
  if (!data.length) return null;

  const mostRisky = [...data].sort((a, b) => b.averageRisk - a.averageRisk)[0];
  const mostActive = [...data].sort((a, b) => b.totalPRs - a.totalPRs)[0];

  const topFive = [...data]
    .sort((a, b) => b.averageRisk - a.averageRisk)
    .slice(0, 5);

  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold text-white mb-6 tracking-wide">
        Repository Intelligence
      </h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm mb-2">Most Risky Repository</p>
          <p className="text-white text-xl font-semibold">{mostRisky.repo}</p>
          <p className="text-red-400 mt-2">
            Avg Risk: {mostRisky.averageRisk} / 10
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm mb-2">Most Active Repository</p>
          <p className="text-white text-xl font-semibold">{mostActive.repo}</p>
          <p className="text-emerald-400 mt-2">
            Total PRs: {mostActive.totalPRs}
          </p>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="h-72 w-full">
          {" "}
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topFive}>
              <XAxis dataKey="repo" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
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
              />
              <Bar dataKey="averageRisk" fill="#EF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
