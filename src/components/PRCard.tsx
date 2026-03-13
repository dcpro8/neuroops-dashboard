import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import remarkGfm from "remark-gfm";
import {
  ChevronDown,
  AlertCircle,
  Calendar,
  User,
  GitBranch,
  Copy,
  Check,
} from "lucide-react";
import { RiskBadge } from "./RiskBadge";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export interface PRData {
  _id: string;
  action: string;
  repo: string;
  prNumber: number;
  title: string;
  author: string;
  aiReview: string;
  riskScore: number;
  createdAt: string;
}

export interface PRCardProps {
  pr: PRData;
  index: number;
}

export const PRCard: React.FC<PRCardProps> = ({ pr, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const githubUrl = `https://github.com/${pr.repo}/pull/${pr.prNumber}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(pr.aiReview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative w-full"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-300",
          "hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl hover:shadow-emerald-900/10",
          isExpanded ? "ring-1 ring-emerald-500/30 bg-white/[0.04]" : "",
        )}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header */}
        <div
          className="relative p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            {/* Left */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-emerald-400/80">
                  <GitBranch size={12} />
                  {pr.repo}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>#{pr.prNumber}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {new Date(pr.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white leading-tight group-hover:text-emerald-50 transition-colors">
                {pr.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User size={14} />
                <span>{pr.author}</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
              <RiskBadge score={pr.riskScore} />
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="text-gray-500 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                {/* AI Analysis Box */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/5 relative group/ai">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold uppercase tracking-wider">
                      <AlertCircle size={16} />
                      AI Risk Analysis
                    </div>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 transition-all flex items-center gap-1.5 text-xs"
                      title="Copy Review"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="text-sm md:text-base leading-relaxed text-gray-300 prose prose-invert max-w-none">
                    {pr.aiReview && (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                          // BULLET POINTS FIX: Added explicit list styles
                          ul: ({ children }) => (
                            <ul className="list-disc list-outside mb-4 ml-5 space-y-2 text-gray-300 font-normal">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-outside mb-4 ml-5 space-y-2 text-gray-300">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1 marker:text-emerald-500">{children}</li>
                          ),
                          // Section Headers
                          h3: ({ children }) => (
                            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mt-6 mb-2 first:mt-0">
                              {children}
                            </h3>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-white font-semibold">{children}</strong>
                          ),
                        }}
                      >
                        {pr.aiReview}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 flex justify-end">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};