import { useEffect, useState } from "react";

import RepoTile from "@components/RepoTile";
// import styles from "@components/RepoTile/RepoTile.module.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

const UserRepoPage = () => {
  const [repo, setRepo] = useState<RepoItem>();

  const { id } = useParams<{ id?: string }>();
  const repoId = `https://api.github.com/repositories/${id}`;

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: repoId,
      });
      setRepo(result.data);
    };

    fetch();
  });

  return (
    <div>
      {repo ? (
        <RepoTile item={repo} onClick={() => {}} />
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

export default UserRepoPage;
