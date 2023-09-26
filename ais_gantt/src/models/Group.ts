import { Resource } from "./Resource";
import { Task } from "./Task";

export interface Group {
    uid: string;
    title: string;
    type: string;
    items: Task[] | Resource[]
}