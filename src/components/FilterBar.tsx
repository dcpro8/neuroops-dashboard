import {
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export type SortMode =
  | "risk-desc"
  | "risk-asc"
  | "date-desc"
  | "date-asc"
  | "title-asc";

interface FilterBarProps {
  onSearch: (value: string) => void;
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  onRepoFilter: (repo: string) => void;
  repositories: string[];
  selectedRepo: string;
}

const SORT_OPTIONS: { label: string; value: SortMode }[] = [
  { label: "Risk: High → Low", value: "risk-desc" },
  { label: "Risk: Low → High", value: "risk-asc" },
  { label: "Newest First", value: "date-desc" },
  { label: "Oldest First", value: "date-asc" },
  { label: "Title A → Z", value: "title-asc" },
];

export const FilterBar = ({
  onSearch,
  sortMode,
  onSortChange,
  onRepoFilter,
  repositories,
  selectedRepo,
}: FilterBarProps) => {
  const [isRepoOpen, setIsRepoOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const repoRef = useRef<HTMLDivElement>(null);

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortMode)?.label ||
    "Sort";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }

      if (
        repoRef.current &&
        !repoRef.current.contains(event.target as Node)
      ) {
        setIsRepoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between relative z-20">
      {/* 🔍 Search */}
      <div className="relative w-full md:w-96 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-emerald-400 transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search repositories, authors, or titles..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* 🔀 Sort Dropdown */}
        <div ref={sortRef} className="relative w-full md:w-auto">
          <button
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border bg-white/[0.03] text-gray-400 border-white/10 hover:bg-white/[0.06] hover:text-white transition-all w-full md:w-auto"
          >
            <ArrowUpDown size={16} />
            {currentSortLabel}
            <ChevronDown
              size={14}
              className={`transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
              >
                <div className="p-1">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        sortMode === option.value
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 📂 Repo Dropdown */}
        <div ref={repoRef} className="relative w-full md:w-auto">
          <button
            onClick={() => setIsRepoOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all w-full md:w-auto ${
              selectedRepo
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-white/[0.03] text-gray-400 border-white/10 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Filter size={16} />
            {selectedRepo || "All Repositories"}
            <ChevronDown
              size={14}
              className={`transition-transform ${
                isRepoOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isRepoOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
              >
                <div className="p-1">
                  <button
                    onClick={() => {
                      onRepoFilter("");
                      setIsRepoOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      !selectedRepo
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    All Repositories
                  </button>

                  {repositories.map((repo) => (
                    <button
                      key={repo}
                      onClick={() => {
                        onRepoFilter(repo);
                        setIsRepoOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedRepo === repo
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {repo}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};