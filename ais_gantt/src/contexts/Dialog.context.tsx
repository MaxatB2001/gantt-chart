import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import DataFieldList from "../components/DataFieldList/DataFieldList";
import AddDataField from "../components/AddDataField/AddDataField";
import FieldTypesList from "../components/FieldTypesList/FieldTypesList";

type DialogContextType = {
  dialogState: { top: number; taskUid: string } | null;
  setDialogState: Dispatch<SetStateAction<{ top: number; taskUid: string } | null>>;
  handleTabClick: (path: string) => void,
  handleBackClick: () => void,
  tabs: Tab[],
  currentTab: Tab | undefined,
  history: [],
  activeDataType: string,
  setActiveDataType: Dispatch<SetStateAction<string>>;
};

export const DialogContext = createContext<DialogContextType | null>(null);

type Tab = {
  className?: string,
      label?: string,
      element: JSX.Element,
      path: string
}

const DialogContextProvider = ({ children }: PropsWithChildren) => {

  const tabs: Tab[] = [
    {
      className: "udf-icon",
      label: "Поля данных",
      element: <DataFieldList/>,
      path: "data-fields"
    },
    {
      element: <FieldTypesList/>,
      path: "field-types"
    },
    {
      element: <AddDataField/>,
      path: "add-data-field"
    }
  ]
  const [activeTab, setActiveTab] = useState<string>("")
  const [history, setHistory] = useState<any>([]);
  const [activeDataType, setActiveDataType] = useState<string>("")

  function handleTabClick(path: string) {
    setHistory([...history, activeTab]);
    setActiveTab(path);
  }

  function handleBackClick() {
    if (history.length < 1) {
      setDialogState(null)
    }
    const prevTab = history.pop();
    setActiveTab(prevTab);
    setHistory([...history]);
  }
  
  let currentTab = tabs.find(tab => tab.path === activeTab)


    const [dialogState, setDialogState] = useState<{
        top: number;
        taskUid: string;
      } | null>(null);

    return (
    <DialogContext.Provider value={{ dialogState, setDialogState, currentTab, tabs, handleBackClick, handleTabClick, history, activeDataType, setActiveDataType }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
