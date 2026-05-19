import {RootState} from "../app/store.ts";
import {TasksStateType} from "../types/Types.ts";

export const selectTasks = (state: RootState): TasksStateType => state.tasks;