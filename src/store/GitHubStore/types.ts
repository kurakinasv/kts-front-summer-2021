/* Интерфейс класса для работы с GitHub API */

import { ApiResponse } from "src/shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
  orgName: string;
};

export type GitHubRepoOwner = {
  id: number;
  url: string;
  avatar_url: string;
  login: string;
};

export type RepoItem = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  owner: GitHubRepoOwner;
  updated_at: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>>;
}
