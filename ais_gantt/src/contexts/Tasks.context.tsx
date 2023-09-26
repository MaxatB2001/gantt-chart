import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Project } from "../models/Project";
import { Group } from "../models/Group";
// import Xarrow from "react-xarrows";

interface GroupContextType {
  groups: Group[];
  setGroups: Dispatch<SetStateAction<Group[]>>;
  links: ReactElement[];
}

export const GroupContext = React.createContext<GroupContextType | null>(null);

type GroupContextProps = React.PropsWithChildren<{}>;

const GroupContextPovider = ({ children }: GroupContextProps) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [links, setLinks] = useState<ReactElement[]>([]);

  useEffect(() => {
    setLinks([
      // <Xarrow key={1} start={"2"} end={"3"} path="grid" strokeWidth={2} />,
    ]);
  }, []);

  return (
    <GroupContext.Provider value={{ groups, setGroups, links }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextPovider;
