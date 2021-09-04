/* eslint-disable no-console */
import React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import GitHubStore from "src/store/GitHubStore";
import { RepoItem } from "src/store/GitHubStore/types";

const ReposSearchPage = () => {
  const [value, showSym] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [repoList, setRepoList] = React.useState<RepoItem[]>([]);

  const setIsLoadingTrue = () => setIsLoading(true);
  const setIsLoadingFalse = () => setIsLoading(false);

  function handleChange(e: any) {
    showSym(`${e.target.value}`);
  }

  React.useEffect(() => {
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
  }, [setRepoList]);

  return (
    <>
      <div className="body">
        <div className={"search"}>
          {!isLoading && (
            <Input
              value={value}
              placeholder={"Введите название организации"}
              className={""}
              onChange={handleChange}
            />
          )}

          {isLoading && (
            <Input
              value={value}
              placeholder={"Введите название организации"}
              onChange={handleChange}
              className={""}
              isDisabled={true}
            />
          )}

          {!isLoading && <Button onClick={setIsLoadingTrue} />}

          {isLoading && (
            <Button isDisabled={true} onClick={setIsLoadingFalse} />
          )}
        </div>

        {repoList.length &&
          repoList.map((repo, index) => {
            return (
              <div key={repo.id} className={"git-repo-tile"}>
                <RepoTile onClick={setIsLoadingFalse} item={repoList[index]} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ReposSearchPage;
