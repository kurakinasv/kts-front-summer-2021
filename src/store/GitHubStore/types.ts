/* Интерфейс класса для работы с GitHub API */

import { ApiResponse } from "src/shared/store/ApiStore/types"

export type GetOrganizationReposListParams = {
    orgName: string
}

export type RepoItem = { 
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}
