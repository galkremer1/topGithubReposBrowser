"use client";
import { useState, useEffect } from "react";
import { GitHubRepo } from "./types/gitHubRepo";
import { gitHubFetcher } from "./clients/gitHubFetcher";
import { Repo } from "./components/Repo";

export default function Home() {
  const { gitHubRepos, loading, error, fetchData } = useFetchRepos();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gitHubRepos.length > 0 &&
          gitHubRepos.map((repo, i) => (
            <Repo
              key={repo.id}
              repo={repo}
              rank={i + 1}
              totalItems={gitHubRepos.length}
            />
          ))}
      </div>
    </main>
  );
}

function useFetchRepos(): {
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
