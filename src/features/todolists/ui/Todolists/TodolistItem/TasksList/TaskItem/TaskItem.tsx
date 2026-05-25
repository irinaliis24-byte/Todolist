import {ListItem} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import {TasksProps, TodoListType} from '@/common/types/Types.ts';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from '@/features/todolists/model/tasks-reduser.ts';
import {ChangeEvent} from 'react';
import {getListItemSx} from '@/common/styles/Todolist.styles.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    task: TasksProps;
    todolistID: string;
}

export const TaskItem = ({task, todolistID}: Props) => {
    const dispatch = useAppDispatch();

    const deleteTask = (taskID: TasksProps["id"], todolistID: TodoListType["id"]) => {
        dispatch(deleteTaskAC({taskID, todolistID}));
    }

    const changeTaskTitle = (todolistID: TasksProps["id"], taskID: TasksProps["taskName"], taskName: string) => {
        dispatch(changeTaskTitleAC({todolistID, taskName, taskID}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked;
        dispatch(changeTaskStatusAC({taskID: task.id, isDone: newTaskStatus, todolistID}));
    }

    return (
        <ListItem
            secondaryAction={
                <IconButton onClick={() => deleteTask(task.id, todolistID)} aria-label="delete" size="small">
                    <ClearIcon fontSize="inherit"/>
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={task.isComplete}
                        tabIndex={-1}
                        disableRipple
                        onChange={changeTaskStatus}
                    />
                </ListItemIcon>
                <EditableSpan sx={getListItemSx(task.isComplete)}
                              value={task.taskName}
                              onChange={(title) => changeTaskTitle(todolistID, title, task.id)}/>
            </ListItemButton>
        </ListItem>
    )
}