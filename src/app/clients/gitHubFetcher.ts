import axios from "axios";
import { GitHubRepoResponse, GitHubRepo } from "../types/gitHubRepo";
import { GitHubCommit } from "../types/gitHubCommit";
import { reposUrlBuilder, commitsUrlBuilder } from "../utils/helpers";
import {
  BASE_URL,
  NUM_OF_REPOS_TO_FETCH,
  NUM_OF_COMMITS_TO_FETCH,
} from "../utils/consts";

class GitHubFetcher {
  async getTopRepos(
    resPerPage: number = NUM_OF_REPOS_TO_FETCH
  ): Promise<GitHubRepo[]> {
    const url = reposUrlBuilder(BASE_URL, resPerPage);
    const res = await axios.get<GitHubRepoResponse>(url);
    const topRepos = res.data.items;
    return topRepos;
  }
  async getLatestCommits(
    owner: string,
    repoName: string,
    sinceTimeStamp: string,
    untilTimeStamp?: string,
    resPerPage: number = NUM_OF_COMMITS_TO_FETCH
  ): Promise<GitHubCommit[]> {
    const url = commitsUrlBuilder(
      BASE_URL,
      owner,
      repoName,
      sinceTimeStamp,
      resPerPage,
      untilTimeStamp
    );
    const res = await axios.get<GitHubCommit[]>(url);
    const latestCommits = res.data;
    return latestCommits;
  }
}

export const gitHubFetcher = new GitHubFetcher();
