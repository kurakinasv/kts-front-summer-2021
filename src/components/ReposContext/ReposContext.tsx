import { createContext, useContext } from "react";

import ReposListStore from "src/ReposListPage/ReposListStore";

export type reposContextProps = React.PropsWithChildren<{
  reposListStore: ReposListStore | null;
}>;

const reposListContext = createContext<reposContextProps>({
  reposListStore: null,
});

const Provider = reposListContext.Provider;

export const useReposListContext = () => useContext(reposListContext);

const ReposContext: React.FC<reposContextProps> = ({
  reposListStore,
  children,
}) => {
  return <Provider value={{ reposListStore }}>{children}</Provider>;
};

export default ReposContext;
