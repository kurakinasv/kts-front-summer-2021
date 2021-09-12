import React from "react";
import "./Avatar.css";

type AvatarProps = {
  src?: string;
  alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <div className={"git-repo-tile__avatar"}>
    {src && <img src={src} alt={alt} />}
    {!src && alt}
  </div>
);

export default React.memo(Avatar);
