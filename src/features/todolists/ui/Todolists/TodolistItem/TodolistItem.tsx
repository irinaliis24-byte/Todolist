import {TodoListType} from '@/common/types/Types.ts';
import {TasksList} from './TasksList/TasksList.tsx';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {createTaskAC} from '@/features/todolists/model/tasks-reduser.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistTitle} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx';
import {FilterButtons} from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx';

type Props = {
    todolist: TodoListType;
}

export const TodolistItem = ({todolist}: Props) => {

    const dispatch = useAppDispatch();

    const createTaskHandler = (title: TodoListType["title"]) => {
        dispatch(createTaskAC({taskName: title, todolistID: todolist.id}))
    }

    return (
        <>
            <TodolistTitle todolist={todolist} />
            <FilterButtons todolist={todolist} />
            <CreateItemForm createTitle={createTaskHandler}/>
            <TasksList todolist={todolist} />
        </>
    );
};
