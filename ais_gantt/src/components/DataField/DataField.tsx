import { TaskDataField } from "../../models/TaskDataFields"
import "./DataField.css"

type DataFieldProps = {
    dataField: TaskDataField
}


const DataField = (props: DataFieldProps) => {
  return (
    <div className="list-item">
        <div className="list-item-label udf-text-icon">
        {props.dataField.name}
        </div>
    </div>
  )
}

export default DataField