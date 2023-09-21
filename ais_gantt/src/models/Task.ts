export interface Task {
    id: number;
    title: string;
    startDate: number;
    endDate: number;
    projectUid: string;
    userUid: string;
    parentId: number | null;
    children?: Task[]
    isOpen?: boolean
    level?: number
    
}