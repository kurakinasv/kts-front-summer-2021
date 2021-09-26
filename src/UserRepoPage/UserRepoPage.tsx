import { useEffect } from "react";

import RepoTile from "@components/RepoTile";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import RepoItemStore from "./RepoItemStore";

const UserRepoPage = () => {
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) repoItemStore.getRepo(id);
  }, [repoItemStore]);

  return (
    <div>
      {repoItemStore.meta === Meta.success && repoItemStore.repo ? (
        <RepoTile item={repoItemStore.repo} onClick={() => {}} />
      ) : (
        <div>
          <div>Такого репозитория нет :c</div>
          <p>
            <Link to="/repos">Назад</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default observer(UserRepoPage);
