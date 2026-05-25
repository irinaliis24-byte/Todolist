import {TodoListType} from '@/common/types/Types.ts';
import List from '@mui/material/List';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/features/todolists/model/tasks-selectors.ts';
import {getFilteredTasks} from '@/common/utilits/Utilits.ts';
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem/TasksList/TaskItem/TaskItem.tsx';

type Props = {
    todolist: TodoListType;
}

export const TasksList = ({todolist}: Props) => {
    const {id, filter} = todolist;
    const tasks = useAppSelector(selectTasks)
    const filteredTasks = getFilteredTasks(tasks[id], filter)


    {
        if (filteredTasks.length === 0) {
            return <span>This list is empty</span>;
        }
    }


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} todolistID={id}/>
                ))}
        </List>
    );

};
