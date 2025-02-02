"use client";

import { useState, useEffect } from "react";

interface LeetCodeStats {
  easy: number;
  medium: number;
  hard: number;
  total: number;
  ranking: number;
  contributionPoints: number;
  totalSubmissions: number;
}

const ProgressBar: React.FC<{ label: string; completed: number; total: number; color: string }> = ({
  label,
  completed,
  total,
  color,
}) => {
  const progress = total > 0 ? ((completed / total) * 100).toFixed(1) : "0";

  return (
    <div className="mb-3">
      <p className="text-sm font-medium">{label}: {completed} / {total}</p>
      <div className="w-full bg-gray-200 rounded-full h-5">
        <div className={`h-5 rounded-full transition-all ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default function LeetCodeProgress() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const username = "nameshsingh"; 

  useEffect(() => {
    fetch(`/api/leetcode?username=${username}`)
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <p className="text-center text-lg font-bold">Loading...</p>;

  const TOTAL_PROBLEMS = 500;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">LeetCode Progress</h2>

      {/* Ranking and Contributions */}
      <div className="flex justify-between mb-4 text-sm">
        <p className="text-gray-600">🌍 Global Rank: <span className="font-semibold">{stats.ranking}</span></p>
        <p className="text-gray-600">🏆 Contribution: <span className="font-semibold">{stats.contributionPoints}</span></p>
      </div>

      {/* Progress Bars */}
      <ProgressBar label="Easy" completed={stats.easy} total={TOTAL_PROBLEMS} color="bg-green-500" />
      <ProgressBar label="Medium" completed={stats.medium} total={TOTAL_PROBLEMS} color="bg-yellow-500" />
      <ProgressBar label="Hard" completed={stats.hard} total={TOTAL_PROBLEMS} color="bg-red-500" />
      <ProgressBar label="Total Solved" completed={stats.total} total={TOTAL_PROBLEMS} color="bg-blue-500" />

      {/* Additional Stats */}
      <div className="text-center mt-4 text-gray-700 text-sm">
        <p>✅ Total Submissions: <span className="font-semibold">{stats.totalSubmissions}</span></p>
        <p>📝 Problems Attempted: <span className="font-semibold">{stats.total}</span></p>
      </div>
    </div>
  );
}
