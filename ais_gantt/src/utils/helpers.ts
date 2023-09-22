import { Resource } from "../models/Resource";
import { Task } from "../models/Task";
import moment from "moment"

export const mapTasksToUser = (tasks: Task[], resources: Resource[]) => {
    return resources.map(resource => ({
        ...resource,
        tasks: tasks.filter(task => task.userUid == resource.id)
    }))
}

export function groupTasks(tasks: Task[]): Task[][] {
    // Step 1: Sort tasks by start date in ascending order
  const sortedTasks = tasks.sort((a, b) => a.startDate - b.startDate);

  // Step 2: Initialize array to hold groups of tasks
  const taskGroups: Task[][] = [];

  // Step 3: Iterate through each task
  for (const task of sortedTasks) {
    let addToGroup = false;

    // Step 4: Check if task overlaps with any existing group
    for (const group of taskGroups) {
      const lastTask = group[group.length - 1];

      // Check if task's start date is after the last task's end date
      if (task.startDate > lastTask.endDate) {
        group.push(task);
        addToGroup = true;
        break;
      }
    }

    // Step 5: Add task to a new group if it doesn't overlap with any existing group
    if (!addToGroup) {
      taskGroups.push([task]);
    }
  }

  return taskGroups;
  }
  

export const calculateDifferenceInDays = (startDate: number, endDate: number) => {
    const start = moment(startDate)
    const end = moment(endDate)
    return end.diff(start, "days")
}

export const buildTaskTree = (tasks: Task[]) => {
  const tree = new Map<string, Task>()

  tasks.forEach(task => {
    const {uid, parentId} = task
    const node: Task = {
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

  const roots: Task[] = []
  tree.forEach(node => {
    if (!node.parentId) {
      roots.push(node)
    }
  })

  return roots
}
// export const calculateTaskLeft = (task: Task) => {
    
// }

// export const updateObjectInTree = (tree: Task[], id: number, newData: any) => {
//    if (!tree || tree.length === 0) {
//     console.log("NO TRREE");
    
//     return
//    }

//    for (let i = 0; i < tree.length; i++) {
//     const rootNode = tree[i]
//     console.log(rootNode);
    
//     if (rootNode.uid === id) {
//       Object.assign(rootNode, newData)
//       // return 
//     }

//     if (rootNode.children && rootNode.children.length > 0) {
//       updateObjectInTree(rootNode.children, id, newData)
//     }
//    }
// }

export const getElementTopOffset = (event:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  return (event.target as HTMLElement).getBoundingClientRect()
}