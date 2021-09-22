import React from "react";

import RepoTile from "@components/RepoTile";
import styles from "@components/RepoTile/RepoTile.module.scss";
import { Link } from "react-router-dom";
import { useSomeContext } from "src/ReposSearchPage/ReposSearchPage";

const ReposListPage = () => {
  const context = useSomeContext();

  React.useEffect(() => {
    context.load();
  }, []);

  return (
    <div>
      <div className={styles.list}>
        {context.list.map((repo, index) => (
          <div key={repo.id}>
            <Link to={`/repos/${repo.id}`}>
              <RepoTile onClick={() => {}} item={context.list[index]} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReposListPage;
