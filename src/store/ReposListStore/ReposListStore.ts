import {
  GetOrganizationReposListParams,
  IGitHubStore,
} from "@store/GitHubStore/types";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { HTTPMethod } from "src/shared/store/ApiStore/types";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "src/store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "src/store/models/shared/collection";

import ApiStore from "../../shared/store/ApiStore";

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements IGitHubStore, ILocalStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  private _list: CollectionModel<number, RepoItemModel> = {
    order: [],
    entities: {},
  };
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
    });
  }

  get list(): RepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.orgName}/repos`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: RepoItemModel[] = [];

        for (const item of response.data) {
          list.push(normalizeRepoItem(item));
        }

        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }
  destroy(): void {}
}
