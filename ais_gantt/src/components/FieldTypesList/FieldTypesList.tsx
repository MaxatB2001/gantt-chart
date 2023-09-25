import { useContext } from "react"
import "./FieldTypesList.css"
import { DialogContext } from "../../contexts/Dialog.context"

const FieldTypesList = () => {
  const dialogContext = useContext(DialogContext)

  const dataFieldTypes = [
      {
          type: "list",
          className: "udf-list-icon",
          label: "Список"
      },
      {
          type: "text",
          className: "udf-text-icon",
          label: "Текст"
      }
  ]

  const typeChoseHandler = (type: string) => {
    dialogContext?.setActiveDataType(type)
    dialogContext?.handleTabClick("add-data-field")
  }

return (
  <>
    <div className="dialog-header">
      <div className="dialog-header-left">
        <div onClick={dialogContext?.handleBackClick} className="dialog-close"></div>
        <div className="dialog-title">Выберите тип данных</div>
      </div>
      <div onClick={() => {dialogContext?.setDialogState(null)}} className="dialog-close-btn"></div>
    </div>
    <div className="data-field-types">
      {
          dataFieldTypes.map(dft => 
              <div onClick={() => typeChoseHandler(dft.type)} key={dft.type} className="list-button">
                  <div className={dft.className + " list-button-icon"}></div>
                  <span>{dft.label}</span>
              </div>
          )
      }
    </div>
  </>
)
}

export default FieldTypesList