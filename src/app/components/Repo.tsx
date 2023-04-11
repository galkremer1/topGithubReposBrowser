import React from "react";
import Image from "next/image";

import { GitHubRepo } from "../types/gitHubRepo";

import { StarIcon } from "@heroicons/react/20/solid";

export function Repo({ repo }: { repo: GitHubRepo }) {
  debugger;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl">
      <div className="relative h-48 sm:h-64">
        <Image
          src={repo.owner.avatar_url}
          alt={repo.name}
          width={100}
          height={100}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{repo.name}</div>
        <p className="text-gray-700 text-base">{repo.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a href={repo.url} className="btn">
          Read More
        </a>
        <div className="float-right flex">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1">{repo.stargazers_count}</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex items-center">
        <Image
          className="w-10 h-10 rounded-full mr-4"
          src={repo.owner.avatar_url}
          alt={repo.name}
          width={40}
          height={40}
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{repo.name}</p>
          <p className="text-gray-600">{repo.name}</p>
        </div>
      </div>
    </div>
  );
}
