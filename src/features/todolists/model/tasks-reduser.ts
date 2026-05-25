import {TasksProps, TasksStateType, TodoListType} from "@/common/types/Types.ts";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}


export const deleteTaskAC = createAction<{
    taskID: TasksProps['id'],
    todolistID: TodoListType['id']
}>('tasks/deleteTask')
export const createTaskAC = createAction<{
    taskName: TasksProps['taskName'],
    todolistID: TodoListType['id']
}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{
    taskID: TasksProps['id'],
    isDone: TasksProps['isComplete'],
    todolistID: TodoListType['id']
}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    taskID: TasksProps['id'],
    taskName: TasksProps['taskName'],
    todolistID: TodoListType['id']
}>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistID].findIndex((task) => task.id === action.payload.taskID)
            state[action.payload.todolistID].splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: TasksProps = {
                id: nanoid(),
                taskName: action.payload.taskName,
                isComplete: false
            }
            state[action.payload.todolistID].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
            if (task) task.isComplete = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
            if (task) task.taskName = action.payload.taskName
        })

})