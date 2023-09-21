import { Task } from "./Task";

export interface Resource {
    id: string;
    name: string;
    tasks: Task[]
}