/* eslint-disable no-console */
import React, { createContext, useContext } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";
import styles from "@styles/style.module.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ReposListPage from "src/ReposListPage";
import GitHubStore from "src/store/GitHubStore";
import { RepoItem } from "src/store/GitHubStore/types";
import UserRepoPage from "src/UserRepoPage";

type ReposContext = { list: RepoItem[]; isLoading: boolean; load: () => void };

const someContext = createContext<ReposContext>({
  list: [],
  isLoading: false,
  load: () => {},
});

const Provider = someContext.Provider;
export const useSomeContext = () => useContext(someContext);

const ReposSearchPage = () => {
  const [value, onChange] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [repoList, setRepoList] = React.useState<RepoItem[]>([]);

  const setIsLoadingTrue = () => setIsLoading(true);
  const setIsLoadingFalse = () => setIsLoading(false);

  const handleSearch = () => {
    setIsLoading((isLoading) => (isLoading ? false : true));
  };

  function handleChange(e: any) {
    onChange(e.target.value);
  }

  const loadRepos = () => {
    setIsLoadingTrue();
    const gitHubStore = new GitHubStore();

    gitHubStore
      .getOrganizationReposList({ orgName: "ktsstudio" })
      .then((response) => {
        return response.success ? response.data : [];
      })
      .then((response) => {
        setRepoList(response);
        setIsLoadingFalse();
      });
  };

  const contextObj: ReposContext = {
    list: repoList,
    isLoading: isLoading,
    load: loadRepos,
  };

  return (
    <BrowserRouter>
      <div className={styles.body}>
        <div className={styles.search}>
          {!isLoading && (
            <Input
              value={value}
              placeholder={"Введите название организации"}
              // className={""}
              onChange={handleChange}
            />
          )}

          {isLoading && (
            <Input
              value={value}
              placeholder={"Введите название организации"}
              onChange={handleChange}
              isDisabled={true}
            />
          )}

          {!isLoading && (
            <Button disabled={isLoading} onClick={handleSearch}>
              <SearchIcon />
            </Button>
          )}

          {isLoading && (
            <Button disabled={isLoading} onClick={handleSearch}>
              <SearchIcon />
            </Button>
          )}
        </div>

        <Switch>
          <Route exact path="/repos/:id" component={UserRepoPage} />
          <Provider value={contextObj}>
            <Route exact path="/repos" component={ReposListPage} />
            <Redirect to="/repos" />
          </Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default ReposSearchPage;
