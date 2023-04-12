import { useState, useEffect } from "react";
import { GitHubRepo } from "../types/gitHubRepo";
import { gitHubFetcher } from "../clients/gitHubFetcher";

export function useFetchRepos(): {
  gitHubRepos: GitHubRepo[];
  loading?: boolean;
  error?: string;
  fetchData: () => void;
} {
  const [gitHubRepos, setGitHubRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const gitHubRepos = await gitHubFetcher.getTopRepos();
      setGitHubRepos(gitHubRepos);
    } catch {
      setError("Error fetching data");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { gitHubRepos, loading, error, fetchData };
}
