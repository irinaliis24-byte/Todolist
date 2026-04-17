
export type FilterTypes = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    tasks: TasksProps[]
    deleteTask: (taskID: string, todolistID: TodoListType["id"]) => void;
    changeFilter: (filter: FilterTypes, todolistID: TodoListType["id"]) => void;
    createTask: (taskName: string, todolistID: TodoListType["id"]) => void;
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: TodoListType["id"]) => void;
    filter: FilterTypes;
    deleteTodolist: (todolistID: TodoListType["id"]) => void;
    changeTaskTitle: (todolistId: string, taskID: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export type TodoList = {
    id: string
    title: string
    filter: FilterTypes
}

export type TasksListProps = {
    todoListID: TodoListType["id"]
    tasks: TasksProps[]
    deleteTask: (taskID: string, todolistID: TodoListType["id"]) => void;
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: TodoListType["id"]) => void;
    changeTaskTitle: (todolistId: string, taskID: string, title: string) => void;
}

export type TasksProps = {
    id: string
    taskName: string
    isComplete: boolean
}

export type TasksStateType = {
    [todolistId: string]: TasksProps[]
}