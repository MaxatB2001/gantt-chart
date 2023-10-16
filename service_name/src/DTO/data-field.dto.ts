import { DataField } from "src/enums/data-field.enum"
import { TaskDataFieldListItem } from "src/schemas/TaskDataFieldListItem"

export class DataFieldDto {
    name: string
    type: DataField
    list?: TaskDataFieldListItem[]
}