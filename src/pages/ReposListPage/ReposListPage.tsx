import React from "react";

import { useReposListContext } from "components/ReposContext/ReposContext";
import RepoTile from "components/RepoTile";
import styles from "components/RepoTile/RepoTile.module.scss";
import { RepoItemModel } from "models/gitHub";
import { Link } from "react-router-dom";

type ReposListPageProps = {
  list: RepoItemModel[];
};

const ReposListPage: React.FC<ReposListPageProps> = ({ list }) => {
  const context = useReposListContext();

  return (
    <div>
      <div className={styles.list}>
        {context.reposListStore?.list.map((repo) => (
          <div key={repo.id}>
            <Link to={`/repos/${repo.id}`}>
              <RepoTile onClick={() => {}} item={repo} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ReposListPage);
