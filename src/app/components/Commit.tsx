import { GitHubCommit } from "../types/gitHubCommit";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

export function Commit({ commit }: { commit: GitHubCommit }) {
  return (
    <div className="flex flex-row items-center border-b-2 cursor-pointer border-gray-300 py-4 bg-gray-50 hover:bg-gray-200">
      <div className="w-1/3 p-4">
        <div className="flex space-between font-medium text-gray-700">
          <a
            title={commit.commit.author.email}
            href={`mailto:${commit.commit.author.email}`}
          >
            <EnvelopeIcon className="h-5 w-5 text-gray-300 mr-1" />
          </a>
          <p title={commit.commit.author.name} className="truncate">
            {commit.commit.author.name}
          </p>
        </div>
      </div>
      <div className="w-1/3">
        <a href={commit.html_url} target="_blank">
          <div
            title={commit.commit.message}
            className="text-sm text-gray-700 line-clamp-3 hover:text-gray-400"
          >
            {commit.commit.message}
          </div>
        </a>
      </div>
      <div className="w-1/3 pl-4">
        <div className="text-sm font-medium text-gray-900">
          {new Date(commit.commit.author.date).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
