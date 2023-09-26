import { TaskSchema } from "src/schemas/Task.schema"
import { TaskDataFieldValue } from "src/schemas/TaskDataFieldValue.schema";

export interface Task {
    uid: string;
    title: string;
    startDate: number;
    endDate: number;
    projectUid: string;
    userUid: string;
    parentId: string | null;
    children?: Task[]
    isOpen?: boolean
    level?: number
    taskDataValues: TaskDataFieldValue[]
}

export interface Resource {
    id: string;
    name: string;
    tasks: Task[]
}

export const groupBy = (arr: TaskSchema[], prop: string) => {
    const response: Array<{title: string, items: TaskSchema[]}> = []
    arr.forEach(item => {
        const title = item[prop]
        const isExist = response.find(item => item.title === title)
        if (isExist) {
            isExist.items.push(item)
        } else {
            response.push({title, items: [item]})
        }
    })
    return response
    // return arr.reduce((groups, item) => {
    //     const propertyValue = item[prop]
    //     groups[propertyValue] = groups[propertyValue] || []
    //     groups[propertyValue].push(item)
    //     return groups
    // }, {}) 
}

// export function groupByProjectId<T>(items: T[], key: keyof T): Map<string, T[]> {
//     return items.reduce((map, item) => {
//         const keyValue = item[key] as string;
//         const group = map.get(keyValue) || [];
//         group.push(item);
//         map.set(keyValue, group);
//         return map;
//     }, new Map<string, T[]>());
// }

export const mapTasksToUser = (tasks: TaskSchema[], resources: Resource[]) => {
    return resources.map(resource => ({
        ...resource,
        tasks: tasks.filter(task => task.userUid == resource.id)
    }))
}


export const buildTaskTree = (tasks: TaskSchema[]) => {
    const tree = new Map<string, TaskSchema>()
  
    tasks.forEach(task => {
      const {uid, parentId} = task
      const node: TaskSchema = {
        ...task,
        children: [],
        level: 0,
        isOpen: true
      }
  
      tree.set(uid, node)
  
      if (parentId) {
        const parent = tree.get(parentId);
        if (parent) {
          const tempNode = {...node, level: parent.level !== undefined ? parent.level + 1 : 0}
          if (parent?.children) {
            parent.children.push(tempNode);
            
          } else {
            parent.children = [tempNode]
          }
          tree.set(tempNode.uid, tempNode)
        }
      }
    })
  
    const roots: TaskSchema[] = []
    tree.forEach(node => {
      if (!node.parentId) {
        roots.push(node)
      }
    })
  
    return roots
  }