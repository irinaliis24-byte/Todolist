import {RootState} from "../app/store.ts";
import {TodoList} from "../types/Types.ts";

export const selectTodolists = (state: RootState): TodoList[] => state.todolists;