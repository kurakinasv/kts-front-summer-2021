import ApiStore from "src/shared/store/ApiStore";

export default class RootStore {
  readonly apiStore = new ApiStore("https://api.github.com");
}
