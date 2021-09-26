import {
  GitHubRepoOwnerApi,
  GitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from "./gitHubRepoOwner";

export type RepoItemApi = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  owner: GitHubRepoOwnerApi;
  updated_at: string;
};

export type RepoItemModel = {
  id: number;
  url: string;
  name: string;
  stargazersCount: number;
  owner: GitHubRepoOwnerModel;
  updatedAt: string;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  url: from.url,
  name: from.name,
  stargazersCount: from.stargazers_count,
  owner: normalizeGitHubRepoOwner(from.owner),
  updatedAt: from.updated_at,
});
