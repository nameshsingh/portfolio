import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface Submission {
  difficulty: string;
  count: number;
}

interface LeetCodeStats {
  easy: number;
  medium: number;
  hard: number;
  total: number;
  ranking: number;
  totalSubmissions: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const username = req.query.username as string;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const query = {
    query: `
      {
        matchedUser(username: "${username}") {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `,
  };

  try {
    console.log(`🔄 Fetching data for: ${username}`);

    const response = await axios.post("https://leetcode.com/graphql", query, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; LeetCodeAPIClient/1.0)",
      },
    });

    console.log("✅ API Response:", response.data);

    if (!response.data?.data?.matchedUser) {
      console.error("❌ Invalid response from LeetCode API");
      return res.status(500).json({ error: "Invalid response from LeetCode" });
    }

    const user = response.data.data.matchedUser;
    const submissions: Submission[] = user.submitStatsGlobal.acSubmissionNum;
    const totalSubmissions = user.submitStatsGlobal.totalSubmissionNum;

    if (!Array.isArray(submissions) || submissions.length < 4) {
      console.error("❌ Incomplete submission data:", submissions);
      return res.status(500).json({ error: "Incomplete data from LeetCode" });
    }

    const stats: LeetCodeStats = {
      easy: submissions[1]?.count ?? 0,
      medium: submissions[2]?.count ?? 0,
      hard: submissions[3]?.count ?? 0,
      total: submissions.reduce((acc, curr) => acc + (curr.count ?? 0), 0),
      ranking: user.profile?.ranking ?? 0,
      totalSubmissions: totalSubmissions.reduce((acc: number, curr: any) => acc + (curr.count ?? 0), 0),
    };

    console.log("✅ Processed Stats:", stats);
    return res.status(200).json(stats);
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
