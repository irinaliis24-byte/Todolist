import {v1} from "uuid";
import {FilterTypes, TodoList} from "../types/Types.ts";


const initialState: TodoList[] = [];

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>;
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (state = initialState, action: ActionType): TodoList[] => {
    switch (action.type) {
        case "delete_todolist": {
            const ID = action.payload.id;
            return state.filter((tl) => tl.id !== ID);
        }
        case "create_todolist": {
            const {title, id} = action.payload;
            const newTodoList: TodoList = {
                id,
                title,
                filter: "all"
            }
            return [...state, newTodoList]
        }
        case "change_todolist_title": {
            const title = action.payload.title;
            const ID = action.payload.id;
            return state.map((tl) => tl.id === ID ? {...tl, title} : tl)
        }
        case "change_todolist_filter": {
            const ID = action.payload.id;
            const filter = action.payload.filter;
            return  state.map((tl) => tl.id === ID ? {...tl, filter} : tl)
        }
        default: {
            return state;
        }
    }
}

export const deleteTodolistAC = (id: TodoList["id"]) => ({
    type: "delete_todolist",
    payload: { id }
} as const)

export const createTodolistAC = (title: TodoList["title"]) => ({
    type: "create_todolist",
    payload: { title, id: v1() }
} as const)

export const changeTodolistTitleAC = (payload: {id: TodoList["id"], title: string}) => ({
    type: "change_todolist_title",
    payload: payload
} as const)

export const changeTodolistFilterAC = (payload: {filter: FilterTypes, id: TodoList["id"]}) => ({
    type: "change_todolist_filter",
    payload: payload
} as const)