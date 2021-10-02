import { createContext, useContext } from "react";

import ReposListStore from "@store/ReposListStore";

export type ReposContextProps = React.PropsWithChildren<{
  reposListStore: ReposListStore | null;
}>;

const reposListContext = createContext<ReposContextProps>({
  reposListStore: null,
});

const Provider = reposListContext.Provider;

export const useReposListContext = () => useContext(reposListContext);

const ReposContext: React.FC<ReposContextProps> = ({
  reposListStore,
  children,
}) => {
  return <Provider value={{ reposListStore }}>{children}</Provider>;
};

export default ReposContext;
