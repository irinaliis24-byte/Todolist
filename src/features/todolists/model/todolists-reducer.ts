import {FilterTypes, TodoListType} from "@/common/types/Types.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TodoListType[] = [];

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction<{
    id: TodoListType["id"],
    title: string
}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{
    filter: FilterTypes,
    id: TodoListType["id"]
}>('todolists/changeTodolistFilter')
export const createTodolistAC = createAction('todolists/createTodolist', (title: TodoListType["title"]) => {
    return {payload: {title, id: nanoid()}}
})


export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (draft, action) => {
            const index = draft.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) draft.splice(index, 1)
        })
        .addCase(changeTodolistTitleAC, (draft, action) => {
            const index = draft.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) draft[index].title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (draft, action) => {
            const todolist = draft.find(todo => todo.id === action.payload.id)
            if (todolist) todolist.filter = action.payload.filter
        })
        .addCase(createTodolistAC, (draft, action) => {
            const newTodolist: TodoListType = {id: action.payload.id, title: action.payload.title, filter: "all"}
            draft.push(newTodolist)
        })
})