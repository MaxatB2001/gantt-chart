import moment from "moment";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";


type ViewContextType = {
  view: {startDate: number, endDate: number, cellWidth: number};
  setView: Dispatch<SetStateAction<{startDate: number, endDate: number , cellWidth: number}>>;
};

export const ViewContext = createContext<ViewContextType | null>(null);

const ViewContextProvider = ({children}: PropsWithChildren) => {
    const [view, setView] = useState<ViewContextType["view"]>({startDate: moment().valueOf(), endDate: 1698094800000, cellWidth: 0})
    return (
        <ViewContext.Provider value={{view, setView}}>
        {children}
    </ViewContext.Provider>
    )
}

export default ViewContextProvider