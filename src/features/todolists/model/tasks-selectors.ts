import {RootState} from '@/app/store.ts';
import {TasksStateType} from "@/common/types/Types.ts";

export const selectTasks = (state: RootState): TasksStateType => state.tasks;