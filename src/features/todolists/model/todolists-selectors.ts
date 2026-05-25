import {RootState} from '@/app/store.ts';
import {TodoListType} from '@/common/types/Types.ts';

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists;