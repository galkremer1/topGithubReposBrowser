import { useFetchCommits } from "../../hooks/useFetchCommits";
import { StopCircleIcon } from "@heroicons/react/20/solid";
import { CloseButton } from "./CloseButton";
import { Error } from "./Error";
import { Commit } from "../Commit";
import { Loader } from "../Loader";
import { GitHubRepo } from "../../types/gitHubRepo";

export function RepoDetailsModal({
  repo,
  onClose,
}: {
  repo: GitHubRepo;
  onClose: () => void;
}) {
  const { gitHubCommits, loading, error, loadMore, moreCommitsAvailable } =
    useFetchCommits(repo);

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
            <CloseButton onClose={onClose} />
            <div className="px-6 py-4">
              {loading && <Loader />}
              <div className="font-bold text-xl mb-2">{repo.name}</div>
              <p className="text-gray-700 text-base">{repo.description}</p>
              <div className="capitalize mt-1">
                <a
                  className="text-gray-700 hover:text-gray-400"
                  target="_blank"
                  href={repo.html_url + "/commits"}
                >
                  <div>previous commits.</div>
                </a>
                {gitHubCommits.length > 0 ? (
                  <span>commits from the last 24 hours:</span>
                ) : (
                  <div>
                    <div>
                      <StopCircleIcon className=" inline h-5 w-5 text-gray-300 mr-1" />
                      Nothing was committed in the last 24 hours.
                    </div>
                  </div>
                )}
                {error?.message && <Error error={error} />}
              </div>
            </div>

            {gitHubCommits.length > 0 && (
              <div className="h-64 overflow-y-auto">
                {gitHubCommits.map((commit) => (
                  <Commit key={commit.sha} commit={commit} />
                ))}
                {moreCommitsAvailable && (
                  <div className="px-6 flex justify-center pt-4 pb-2">
                    <button
                      onClick={loadMore}
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
