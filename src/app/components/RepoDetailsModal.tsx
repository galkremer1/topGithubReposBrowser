import { GitHubRepo } from "../types/gitHubRepo";
import { GitHubCommit } from "../types/gitHubCommit";
import { useState, useEffect, useMemo } from "react";
import { gitHubFetcher } from "../clients/gitHubFetcher";
import { getTimestamp24HoursAgo } from "../utils/helpers";
import { StopCircleIcon } from "@heroicons/react/20/solid";
import { handleAxiosError } from "../utils/helpers";
import { Commit } from "./Commit";
import { Loader } from "./Loader";

import { NUM_OF_COMMITS_TO_FETCH } from "../utils/consts";

export function RepoDetailsModal({
  repo,
  onClose,
}: {
  repo: GitHubRepo;
  onClose: () => void;
}) {
  const { gitHubCommits, loading, error, fetchData } = useFetchCommits(repo);
  const [currentPage, setCurrentPage] = useState(1);

  const incrementPageCount = () => {
    setCurrentPage((prevPageCount) => prevPageCount + 1);
  };

  const handleFetchAdditionalCommits = () => {
    incrementPageCount();
    const lastCommit = [...gitHubCommits].pop();
    //We would like to get previous commits not including the last one that we've fetched
    const lastCommitDateMinusMillisecond = new Date(
      new Date(lastCommit?.commit.author.date || "").getTime() - 1
    ).toISOString();
    fetchData(lastCommitDateMinusMillisecond, gitHubCommits);
  };

  const areCommitsAvailable = useMemo(() => {
    return gitHubCommits.length > 0;
  }, [gitHubCommits]);

  const additionalCommitsAreAvailable = useMemo(() => {
    return gitHubCommits.length === NUM_OF_COMMITS_TO_FETCH * currentPage;
  }, [gitHubCommits]);

  if (loading) {
    return <Loader />;
  } else
    return (
      <div className="modal-overlay">
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div
                onClick={onClose}
                className="absolute inset-0 bg-gray-500 opacity-75"
              ></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-xl sm:max-w-lg sm:w-full">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-4 text-gray-700 hover:text-black focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{repo.name}</div>
                <p className="text-gray-700 text-base">{repo.description}</p>
                <div className="capitalize mt-1">
                  {areCommitsAvailable ? (
                    <span>commits from the last 24 hours:</span>
                  ) : (
                    <div>
                      <div>
                        <StopCircleIcon className=" inline h-5 w-5 text-gray-300 mr-1" />
                        no commits from the last 24 hours are available.
                      </div>
                      <a target="_blank" href={repo.html_url + "/commits"}>
                        <div>Click for previous commits.</div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {areCommitsAvailable && (
                <div className="h-64 overflow-y-auto">
                  {gitHubCommits.map((commit) => (
                    <Commit key={commit.sha} commit={commit} />
                  ))}
                  {additionalCommitsAreAvailable && (
                    <div className="px-6 flex justify-center pt-4 pb-2">
                      <button
                        onClick={handleFetchAdditionalCommits}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Fetch More Commits
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

function useFetchCommits(repo: GitHubRepo): {
  gitHubCommits: GitHubCommit[];
  loading?: boolean;
  error?: { message?: string; url?: string };
  fetchData: (
    untilTimeStamp: string | undefined,
    gitHubCommits: GitHubCommit[]
  ) => void;
  setGitHubCommits: React.Dispatch<React.SetStateAction<GitHubCommit[]>>;
} {
  const [gitHubCommits, setGitHubCommits] = useState<GitHubCommit[]>([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async (
    untilTimeStamp?: string,
    previousCommits: GitHubCommit[] = []
  ) => {
    setLoading(true);
    setError({});

    try {
      const gitHubCommits = await gitHubFetcher.getLatestCommits(
        repo.owner.login,
        repo.name,
        getTimestamp24HoursAgo(),
        untilTimeStamp
      );
      //TODO: There is a sorting bug that needs to be fixed
      setGitHubCommits([...previousCommits, ...gitHubCommits]);
    } catch (error: any) {
      const parsedError = handleAxiosError(error);
      setError(parsedError);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { gitHubCommits, loading, error, fetchData, setGitHubCommits };
}
