import axios from "axios";
import { GitHubRepoResponse, GitHubRepo } from "../types/gitHubRepo";
import { GitHubCommit } from "../types/gitHubCommit";
import { reposUrlBuilder, commitsUrlBuilder } from "../utils/helpers";

const baseUrl = "https://api.github.com";

class GitHubFetcher {
  async getTopRepos(resPerPage: number = 100): Promise<GitHubRepo[]> {
    const url = reposUrlBuilder(baseUrl, resPerPage);
    const res = await axios.get<GitHubRepoResponse>(url);
    const topRepos = res.data.items;
    return topRepos;
  }
  async getLatestCommits(resPerPage: number = 50): Promise<GitHubCommit[]> {
    const url = commitsUrlBuilder(
      baseUrl,
      "freeCodeCamp",
      "freeCodeCamp",
      resPerPage,
      "2020-04-10T22:19:42Z"
    );
    const res = await axios.get<GitHubCommit[]>(url);
    const latestCommits = res.data;
    return latestCommits;
  }
}

export const gitHubFetcher = new GitHubFetcher();
