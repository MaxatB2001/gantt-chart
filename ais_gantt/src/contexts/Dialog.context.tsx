import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

type DialogContextType = {
  dialogState: { top: number; taskUid: string } | null;
  setDialogState: Dispatch<SetStateAction<{ top: number; taskUid: string } | null>>;
};

export const DialogContext = createContext<DialogContextType | null>(null);


const DialogContextProvider = ({ children }: PropsWithChildren) => {
    const [dialogState, setDialogState] = useState<{
        top: number;
        taskUid: string;
      } | null>(null);

    return (
    <DialogContext.Provider value={{ dialogState, setDialogState }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
