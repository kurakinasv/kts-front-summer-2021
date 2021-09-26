export type GetOrganizationReposListParams = {
  orgName: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}
