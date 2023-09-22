import { DataField } from "../enums/data-field.enum";

export interface TaskDataField {
  uid: string;

  name: string;

  type: DataField;

  list: Array<string>;
}
