import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { TaskDataField } from "../models/TaskDataFields";

type MetadataContextType = {
  metaData: {taskDataFields: TaskDataField[]} | null;
  setMetaData: Dispatch<SetStateAction<{ taskDataFields: TaskDataField[]} | null>>;
};

export const MetadataContext = createContext<MetadataContextType | null>(null);

const MetadataContextProvider = ({children}: PropsWithChildren) => {
    const [metaData, setMetaData] = useState<{taskDataFields: TaskDataField[] } | null>(null)
    return (
        <MetadataContext.Provider value={{metaData, setMetaData}}>
        {children}
    </MetadataContext.Provider>
    )
}

export default MetadataContextProvider