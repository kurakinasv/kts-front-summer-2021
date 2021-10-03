import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import { computed, makeObservable, observable, runInAction } from "mobx";
import ApiStore from "shared/store/ApiStore";
import { HTTPMethod } from "shared/store/ApiStore/types";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "store/models/gitHub";

type PrivateFields = "_repo" | "_meta";

export default class RepoItemStore implements ILocalStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  private _repo: null | RepoItemModel = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _repo: observable.ref,
      _meta: observable,
      repo: computed,
      meta: computed,
    });
  }

  get repo(): RepoItemModel | null {
    return this._repo;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepo(id: string) {
    const endPoint: string = `/repositories/${id}`;
    this._meta = Meta.loading;
    this._repo = null;
    const result = await this.apiStore.request<RepoItemApi>({
      data: {},
      endpoint: endPoint,
      headers: {},
      method: HTTPMethod.GET,
    });

    runInAction(() => {
      if (!result.success) {
        this._meta = Meta.error;
      }

      try {
        this._meta = Meta.success;
        this._repo = normalizeRepoItem(result.data);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._repo = null;
      }
    });
  }

  destroy(): void {}
}
