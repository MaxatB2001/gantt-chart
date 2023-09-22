import { Resource } from "./Resource";
import { Task } from "./Task";

export interface Project {
    uid: string,
    fullName: string,
    users: Resource[],
    tasks: Task[]
    isOpen: boolean
}