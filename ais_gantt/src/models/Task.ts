import { TaskDataValues } from "./TaskDataValues";

export interface Task {
    uid?: string;
    title: string;
    startDate: number;
    endDate: number;
    projectUid: string;
    userUid: string;
    parentId: string | null;
    children?: Task[]
    isOpen?: boolean
    level?: number
    taskDataValues: TaskDataValues[]
}