import axios from "axios";
import { GitHubRepoResponse, GitHubRepo } from "../types/gitHubRepo";
import { urlBuilder } from "../utils/helpers";

const baseUrl = "https://api.github.com/search/repositories";

class GitHubTopReposFetcher {
  async getTopRepos(resPerPage: number = 100): Promise<GitHubRepo[]> {
    const url = urlBuilder(baseUrl, resPerPage);
    const res = await axios.get<GitHubRepoResponse>(url);
    const topRepos = res.data.items;
    return topRepos;
  }
}

export const gitHubTopReposFetcher = new GitHubTopReposFetcher();
