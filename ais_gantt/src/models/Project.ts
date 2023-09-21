import { Resource } from "./Resource";
import { Task } from "./Task";

export interface Project {
    id: string,
    title: string,
    users: Resource[],
    tasks: Task[]
    isOpen: boolean
}