import React from "react";
import Image from "next/image";

import { GitHubRepo } from "../types/gitHubRepo";

import { StarIcon, TrophyIcon } from "@heroicons/react/20/solid";

export function Repo({
  repo,
  rank,
  totalItems,
}: {
  repo: GitHubRepo;
  rank: number;
  totalItems: number;
}) {
  return (
    <div className="w-70 h-70 bg-slate-300 rounded overflow-hidden shadow-lg hover:shadow-2xl">
      <div className="px-6 flex items-center justify-between pt-4 pb-2 ">
        <div className="flex items-center">
          <span className="ml-1">
            {rank}/{totalItems}
          </span>
          {rank === 1 && <TrophyIcon className="mx-2 h-5 w-5 text-gray-200" />}
        </div>
        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-300" />
          <span className="ml-1">{repo.stargazers_count}</span>
        </div>
      </div>
      <div className="px-6 py-4 h-32">
        <a href={repo.html_url} target="_blank">
          <div className="font-bold text-lg mb-2 line-clamp-1 cursor-pointer hover:text-gray-400">
            {repo.name}
          </div>
        </a>

        <p className="text-gray-700 text-base line-clamp-2">
          {repo.description}
        </p>
      </div>

      <div className="px-6 flex items-center justify-between pt-4 pb-2">
        <a href={repo.owner.html_url} target="_blank">
          <div className="flex items-center cursor-pointer text-gray-900 hover:text-gray-400">
            <Image
              className="w-10 h-10 rounded-full mr-4"
              src={repo.owner.avatar_url}
              alt={repo.name}
              width={40}
              height={40}
            />
            <div className="text-sm">
              <p className="leading-none">{repo.owner.login}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
