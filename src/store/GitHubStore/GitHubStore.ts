import { ApiResponse, HTTPMethod } from "src/shared/store/ApiStore/types";

import ApiStore from "../../shared/store/ApiStore";
import {
  GetOrganizationReposListParams,
  IGitHubStore,
  RepoItem,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    // TODO: Здесь сделайте вызов из this.apiStore и верните результат
    // в случае успешного рез-та ApiResponse в поле data будет иметь массив значений RepoItem[]

    // вызываем запрос
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.orgName}/repos`,
    });
  }
}
