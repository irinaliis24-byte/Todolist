
export type FilterTypes = "all" | "active" | "completed"

export type TodolistProps = {
    title: string
    date?: string
    tasks: TasksProps[]
    deleteTask: (taskID: string) => void;
    changeFilter: (filter: FilterTypes) => void;
    createTask: (taskName: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    filter: FilterTypes;
}

export type TasksListProps = {
    tasks: TasksProps[]
    deleteTask: (taskID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
}

export type TasksProps = {
    id: string
    taskName: string
    isComplete: boolean
}