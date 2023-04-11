import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import { GitHubRepo } from "../types/gitHubRepo";
export function RepoDetailsModal({
  repo,
  onClose,
}: {
  repo: GitHubRepo;
  onClose: () => void;
}) {
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
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{repo.name}</div>
              <p className="text-gray-700 text-base">{repo.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  className="w-10 h-10 rounded-full mr-4"
                  src={repo.owner.avatar_url}
                  alt={repo.name}
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">
                    {repo.owner.login}
                  </p>
                  <p className="text-gray-600">{repo.owner.html_url}</p>
                </div>
              </div>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1">{repo.stargazers_count}</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <button className="btn mr-4" type="button" onClick={onClose}>
                Close
              </button>
              <a href={repo.html_url} className="btn">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
