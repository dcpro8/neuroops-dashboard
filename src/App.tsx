import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { PRList } from "./components/PRList";
import { FilterBar } from "./components/FilterBar";
import type { SortMode } from "./components/FilterBar";
import { MetricsBar } from "./components/MetricsBar";
import { PRData } from "./components/PRCard";
import { RiskDistribution } from "./components/RiskDistribution";
import { RiskTrend } from "./components/RiskTrend";
import { RepoIntelligence } from "./components/RepoIntelligence";
import { SystemIntelligence } from "./components/SystemIntelligence";

// --- Configuration ---
// Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

interface OverviewData {
  totalPRs: number;
  highRisk: number;
  moderateRisk: number;
  lowRisk: number;
  averageRisk: number;
  uniqueRepos: number;
}

interface RiskTrendPoint {
  date: string;
  avgRisk: number;
  count: number;
}

export default function App() {
  const [prs, setPrs] = useState<PRData[]>([]);
  const [filteredPrs, setFilteredPrs] = useState<PRData[]>([]);
  const [repoStats, setRepoStats] = useState<any[]>([]);
  const [riskTrend, setRiskTrend] = useState<RiskTrendPoint[]>([]);
  const [intelligence, setIntelligence] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<OverviewData | null>(null);
  const [trendPeriod, setTrendPeriod] = useState(14);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("risk-desc");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [riskDistribution, setRiskDistribution] = useState<{
    low: number;
    moderate: number;
    high: number;
  } | null>(null);

  const repositories: string[] = Array.isArray(prs)
    ? Array.from(new Set(prs.map((pr) => pr.repo)))
    : [];

  /* ----------------------------------------
      Export JSON
  ---------------------------------------- */
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(prs, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "neuroops-pr-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ----------------------------------------
      MAIN DATA FETCHER
  ---------------------------------------- */
  const fetchAllData = useCallback(async () => {
    // Safety check: Don't fetch if the URL is missing
    if (!API_BASE_URL) {
      console.error("VITE_API_URL is not defined in environment variables");
      return;
    }

    try {
      const [
        prsRes,
        analyticsRes,
        distributionRes,
        trendRes,
        repoRes,
        intelligenceRes,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/prs?page=1&limit=50`),
        axios.get(`${API_BASE_URL}/api/analytics/overview`),
        axios.get(`${API_BASE_URL}/api/analytics/risk-distribution`),
        axios.get(
          `${API_BASE_URL}/api/analytics/risk-trend?days=${trendPeriod}`,
        ),
        axios.get(`${API_BASE_URL}/api/analytics/repos`),
        axios.get(`${API_BASE_URL}/api/analytics/intelligence`),
      ]);

      if (prsRes.data && Array.isArray(prsRes.data.data)) {
        setPrs(prsRes.data.data);
      }

      setAnalytics(analyticsRes.data);
      setRiskDistribution(distributionRes.data);
      setRiskTrend(trendRes.data);
      setRepoStats(repoRes.data);
      setIntelligence(intelligenceRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [trendPeriod]);

  /* ----------------------------------------
      Initial Load
  ---------------------------------------- */
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  /* ----------------------------------------
      Polling (Realtime Updates)
  ---------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAllData]);

  useEffect(() => {
    const eventSource = new EventSource("/api/events");

    eventSource.onmessage = () => {
      console.log("Realtime PR update received");

      axios.get("/api/prs?page=1&limit=50").then((res) => {
        setPrs(res.data.data);
      });
    };

    return () => eventSource.close();
  }, []);

  /* ----------------------------------------
      Filtering + Sorting
  ---------------------------------------- */
  useEffect(() => {
    let result = [...prs];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (pr) =>
          pr.title.toLowerCase().includes(lowerQuery) ||
          pr.repo.toLowerCase().includes(lowerQuery) ||
          pr.author.toLowerCase().includes(lowerQuery),
      );
    }

    if (selectedRepo) {
      result = result.filter((pr) => pr.repo === selectedRepo);
    }

    switch (sortMode) {
      case "risk-desc":
        result.sort((a, b) => b.riskScore - a.riskScore);
        break;
      case "risk-asc":
        result.sort((a, b) => a.riskScore - b.riskScore);
        break;
      case "date-desc":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
    }

    setFilteredPrs(result);
  }, [prs, searchQuery, sortMode, selectedRepo]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <Header />

        {intelligence && <SystemIntelligence data={intelligence} />}
        {analytics && <MetricsBar {...analytics} />}

        <div className="flex justify-end mb-6">
          <button
            onClick={exportJSON}
            className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            Export Data
          </button>
        </div>

        {riskDistribution && <RiskDistribution {...riskDistribution} />}

        {riskTrend.length > 0 && (
          <RiskTrend
            data={riskTrend}
            period={trendPeriod}
            onPeriodChange={setTrendPeriod}
          />
        )}

        {repoStats.length > 0 && <RepoIntelligence data={repoStats} />}

        <FilterBar
          onSearch={setSearchQuery}
          sortMode={sortMode}
          onSortChange={setSortMode}
          onRepoFilter={setSelectedRepo}
          repositories={repositories}
          selectedRepo={selectedRepo}
        />

        <div className="mb-6 text-sm text-gray-500">
          Showing {filteredPrs.length} of {prs.length} pull requests
        </div>

        <PRList prs={filteredPrs} loading={loading} />
      </div>
    </div>
  );
}
