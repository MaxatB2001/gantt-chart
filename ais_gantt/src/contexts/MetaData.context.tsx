import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { TaskDataField } from "../models/TaskDataFields";
import { Project } from "../models/Project";

type MetadataContextType = {
  metaData: {taskDataFields: TaskDataField[], projects: Project[]} | null;
  setMetaData: Dispatch<SetStateAction<{ taskDataFields: TaskDataField[], projects: Project[]} | null>>;
};

export const MetadataContext = createContext<MetadataContextType | null>(null);

const MetadataContextProvider = ({children}: PropsWithChildren) => {
    const [metaData, setMetaData] = useState<{taskDataFields: TaskDataField[], projects: Project[] } | null>(null)
    return (
        <MetadataContext.Provider value={{metaData, setMetaData}}>
        {children}
    </MetadataContext.Provider>
    )
}

export default MetadataContextProvider