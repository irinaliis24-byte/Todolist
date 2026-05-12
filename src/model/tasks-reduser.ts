import {TasksProps, TasksStateType, TodoListType} from "../types/Types.ts";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksStateType = {}

type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type CreateTaskAT = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | DeleteTaskAT | CreateTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "delete_todolist": {
            const copyTasksState = {...state};
            delete copyTasksState[action.payload.id];
            return copyTasksState
        }
        case "create_todolist": {
            return {...state, [action.payload.id]: []}
        }
        case "delete_task": {
            const todolistForDeleteTask = state[action.payload.todolistID];
            const filteredTasks = todolistForDeleteTask.filter(task => task.id !== action.payload.taskID);
            return {...state, [action.payload.todolistID]: filteredTasks};
        }
        case "create_task": {
            const newTask: TasksProps = {
                id: action.payload.taskID,
                taskName: action.payload.taskName,
                isComplete: false
            };
            const newTasks = [...state[action.payload.todolistID], newTask];
            return {...state, [action.payload.todolistID]: newTasks};
        }
        case "change_task_status": {
            const newStatus = state[action.payload.todolistID].map(task => (task.id === action.payload.taskID)
                ? ({
                    ...task,
                    isComplete: action.payload.isDone
                }) : task);
            return {...state, [action.payload.todolistID]: newStatus};
        }
        case "change_task_title": {
            const TodoID = action.payload.todolistID;
            return ({
                ...state,
                [TodoID]: state[TodoID].map((task) => task.id === action.payload.taskID ? {...task, taskName: action.payload.taskName} : task)
            });
        }
        default: {
            return state;
        }
    }
}


export const deleteTaskAC = (payload: {taskID: TasksProps["id"], todolistID: TodoListType["id"]}) => ({
    type: "delete_task",
    payload: payload,
} as const)


export const createTaskAC = (payload: {taskName: TasksProps["taskName"], todolistID: TodoListType["id"]}) => ({
    type: "create_task",
    payload: {...payload, taskID: v1()}
} as const)


export const changeTaskStatusAC = (payload: {taskID: TasksProps["id"], isDone: TasksProps["isComplete"], todolistID: TodoListType["id"]}) => ({
    type: "change_task_status",
    payload: payload
} as const)


export const changeTaskTitleAC = (payload: {taskID: TasksProps["id"], taskName: TasksProps["taskName"], todolistID: TodoListType["id"]}) => ({
    type: "change_task_title",
    payload: payload
} as const)