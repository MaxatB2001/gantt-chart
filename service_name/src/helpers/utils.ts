import { TaskSchema } from "src/schemas/Task.schema"

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