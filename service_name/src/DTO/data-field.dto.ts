import { DataField } from "src/enums/data-field.enum"

export class DataFieldDto {
    name: string
    type: DataField
    list?: string[]
}