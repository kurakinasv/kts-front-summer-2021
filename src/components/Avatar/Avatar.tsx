import React from "react";

import styles from "../RepoTile/RepoTile.module.scss";

type AvatarProps = {
  src?: string;
  alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <div className={styles.repotile__avatar}>
    {src && <img src={src} alt={alt} />}
    {!src && alt}
  </div>
);

export default React.memo(Avatar);
