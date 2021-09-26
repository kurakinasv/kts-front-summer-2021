import { HTTPMethod } from "src/shared/store/ApiStore/types";

import ApiStore from "../../shared/store/ApiStore";
import { RepoItemApi } from "../models/gitHub";
import { GetOrganizationReposListParams, IGitHubStore } from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    // TODO: Здесь сделайте вызов из this.apiStore и верните результат
    // в случае успешного рез-та ApiResponse в поле data будет иметь массив значений RepoItem[]

    // вызываем запрос
    const response = await this.apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.orgName}/repos`,
    });

    return response.data;
  }
}
