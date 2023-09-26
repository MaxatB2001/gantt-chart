import { Project } from "../models/Project"
import { Resource } from "../models/Resource"
import { Task } from "../models/Task"
import { TaskDataField } from "../models/TaskDataFields"

export const init = async () => {
    const response = await fetch("http://localhost:49600/task-management/init")
    return await response.json() as Promise<{tasks: Task[], resourses: Resource[], projects: Project[], TaskDataFields: TaskDataField[]}>
}

export const getTask = async (uid: string): Promise<Task> => {
    const response = await fetch(`http://localhost:49600/task-management/task/${uid}`)
    return await response.json() as Promise<Task>
}

export const updateTask = async (task: Task) => {
    const response = await fetch("http://localhost:49600/task-management/task", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
    })
    return await response.json()
}

export const addDataField = async (body: {name: string, type: string}) => {
    const response = await fetch(`http://localhost:49600/task-management/data-field`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
    })
    return await response.json()
}

export const applyFilter = async (filter: any) => {
    const response = await fetch(`http://localhost:49600/task-management/apply-filter?` + new URLSearchParams(filter).toString())
    return await response.json()
}