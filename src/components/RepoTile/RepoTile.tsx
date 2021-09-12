import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "src/store/GitHubStore/types";

import styles from "./RepoTile.module.scss";

export type RepoTileProps = {
  item: RepoItem;
  onClick: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  const repoLink = `https://github.com/${item.owner.login}`;

  return (
    <div className={styles.repotile__content} onClick={onClick}>
      <Avatar src={item.owner.avatar_url} alt={item.name[0]} />
      <div className={styles.repotile__info}>
        <div className={styles.repotile__heading}>{item.name}</div>
        <a
          className={styles.repotile__orgLink}
          href={repoLink}
          target={"_blank"}
          rel={"noreferrer"}
        >
          {item.owner.login}
        </a>
        <div className={styles.repotile__stats}>
          <div className={styles.repotile__stats__stars}>
            <StarIcon />
            {item.stargazers_count}
          </div>
          <div>Updated {item.updated_at.substr(0, 10)}</div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;
