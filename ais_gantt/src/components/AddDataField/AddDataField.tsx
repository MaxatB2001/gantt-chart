import { useContext, useState } from "react";
import "./AddDataField.css";
import { DialogContext } from "../../contexts/Dialog.context";
import DialogButton from "../DialogButton/DialogButton";
import { addDataField } from "../../api/task-queries";

const AddDataField = () => {
  const dialogContext = useContext(DialogContext);
  console.log(dialogContext?.activeDataType);
  const [dataFieldName, setDataFieldName] = useState("")
  const submit = () => {
    if (dialogContext?.activeDataType) {
        addDataField({type: dialogContext?.activeDataType, name: dataFieldName}).then(data => {
            dialogContext.handleBackClick()
        })
    }
  }

  return (
    <>
      <div className="dialog-header">
        <div className="dialog-header-left">
          <div
            onClick={dialogContext?.handleBackClick}
            className="dialog-close"
          ></div>
          <div className="dialog-title">Поля данных</div>
          <DialogButton
            onClick={() => submit()}
            text="Сохранить"
          />
        </div>
        <div
          onClick={() => {
            dialogContext?.setDialogState(null);
          }}
          className="dialog-close-btn"
        ></div>
      </div>
      <div className="data-field-list">
            <input value={dataFieldName} onChange={event => setDataFieldName(event.target.value)}/>
      </div>
    </>
  );
};

export default AddDataField;
