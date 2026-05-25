
export type FilterTypes = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterTypes
}

export type TasksProps = {
    id: string
    taskName: string
    isComplete: boolean
}

export type TasksStateType = {
    [todolistId: string]: TasksProps[]
}