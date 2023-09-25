import { useContext } from "react";
import "./DataFieldList.css";
import { MetadataContext } from "../../contexts/MetaData.context";
import DataField from "../DataField/DataField";
import { DialogContext } from "../../contexts/Dialog.context";
import DialogButton from "../DialogButton/DialogButton";

const DataFieldList = () => {
  const dialogContext = useContext(DialogContext);
  const metadataContext = useContext(MetadataContext);
  return (
    <>
      <div className="dialog-header">
        <div className="dialog-header-left">
          <div onClick={dialogContext?.handleBackClick} className="dialog-close"></div>
          <div className="dialog-title">Поля данных</div>
          <DialogButton onClick={() => dialogContext?.handleTabClick("field-types")} text="Добавить"/>
        </div>
        <div onClick={() => {dialogContext?.setDialogState(null)}} className="dialog-close-btn"></div>
      </div>
      <div className="data-field-list">
        {metadataContext?.metaData?.taskDataFields.map((tdf) => (
          <DataField key={tdf.uid} dataField={tdf} />
        ))}
      </div>
    </>
  );
};

export default DataFieldList;
