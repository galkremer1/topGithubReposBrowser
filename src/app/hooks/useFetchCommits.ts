import { useState, useEffect } from "react";
import { GitHubRepo } from "../types/gitHubRepo";
import { GitHubCommit } from "../types/gitHubCommit";
import { errorMessage } from "../types/errorMessage";
import { getTimestamp24HoursAgo } from "../utils/helpers";
import { handleAxiosError } from "../utils/helpers";
import { gitHubFetcher } from "../clients/gitHubFetcher";
import { NUM_OF_COMMITS_TO_FETCH } from "../utils/consts";

export function useFetchCommits(repo: GitHubRepo): {
  gitHubCommits: GitHubCommit[];
  loading?: boolean;
  error?: errorMessage;
  loadMore: () => void;
  moreCommitsAvailable: boolean;
  setGitHubCommits: React.Dispatch<React.SetStateAction<GitHubCommit[]>>;
} {
  const [gitHubCommits, setGitHubCommits] = useState<GitHubCommit[]>([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const incrementPageCount = () => {
    setCurrentPage((prevPageCount) => prevPageCount + 1);
  };

  const moreCommitsAvailable =
    gitHubCommits.length === NUM_OF_COMMITS_TO_FETCH * currentPage;

  const fetchData = async (page: number) => {
    setLoading(true);
    setError({});

    try {
      const gitHubCommits = await gitHubFetcher.getLatestCommits(
        repo.owner.login,
        repo.name,
        getTimestamp24HoursAgo(),
        currentPage
      );
      //TODO: There is a sorting bug that needs to be fixed
      setGitHubCommits((previousCommits) => [
        ...previousCommits,
        ...gitHubCommits,
      ]);
    } catch (error: any) {
      const parsedError = handleAxiosError(error);
      setError(parsedError);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return {
    gitHubCommits,
    loading,
    error,
    loadMore: incrementPageCount,
    moreCommitsAvailable,
    setGitHubCommits,
  };
}
