import moment from "moment";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

type ViewContextType = {
  view: {
    startDate: number;
    endDate: number;
    cellWidth: number;
    g: string;
    udfUid: null | string;
  };
  setView: Dispatch<
    SetStateAction<{
      startDate: number;
      endDate: number;
      cellWidth: number;
      g: string;
      udfUid: null | string;
    }>
  >;
};

export const ViewContext = createContext<ViewContextType | null>(null);

const ViewContextProvider = ({ children }: PropsWithChildren) => {
  const [view, setView] = useState<ViewContextType["view"]>({
    startDate: moment().valueOf(),
    endDate: moment().startOf("d").add(1, "month").valueOf(),
    cellWidth: 0,
    g: "RNO",
    udfUid: null,
  });
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
