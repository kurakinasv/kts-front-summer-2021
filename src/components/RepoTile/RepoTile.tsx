import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "src/store/GitHubStore/types";

import "@styles/style.css";

export type RepoTileProps = {
  item: RepoItem;
  onClick: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  const repoLink = `https://github.com/${item.owner.login}`;

  return (
    <div className={"git-repo-tile__content"} onClick={onClick}>
      <Avatar src={item.owner.avatar_url} alt={item.name[0]} />
      <div className={"git-repo-tile__info"}>
        <div className={"git-repo-tile__heading"}>{item.name}</div>
        <a
          className={"git-repo-tile__org-link"}
          href={repoLink}
          target={"_blank"}
          rel={"noreferrer"}
        >
          {item.owner.login}
        </a>
        <div className={"git-repo-tile__stats"}>
          <div className={"git-repo-tile__stats__stars"}>
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
