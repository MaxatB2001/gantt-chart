import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Project } from "../models/Project";
import Xarrow from "react-xarrows";

interface GroupContextType {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  links: ReactElement[];
}

export const GroupContext = React.createContext<GroupContextType | null>(null);

type GroupContextProps = React.PropsWithChildren<{}>;

const GroupContextPovider = ({ children }: GroupContextProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [links, setLinks] = useState<ReactElement[]>([]);

  useEffect(() => {
    setLinks([
      <Xarrow key={1} start={"2"} end={"3"} path="grid" strokeWidth={2} />,
    ]);
  }, []);

  return (
    <GroupContext.Provider value={{ projects, setProjects, links }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextPovider;
