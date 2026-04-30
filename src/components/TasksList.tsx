import {TasksListProps} from "../types/Types.ts";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import {getListItemSx} from "../styles/Todolist.styles.ts";

export const TasksList = ({tasks, deleteTask, changeTaskStatus, todoListID, changeTaskTitle}: TasksListProps) => {

    {
        if (tasks.length === 0) {
            return <span>This list is empty</span>;
        }
    }

    const changeTaskTitleHandler = (title: string, taskId: string) => {
            changeTaskTitle(todoListID, taskId, title)
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = e.currentTarget.checked;
                    changeTaskStatus(task.id, newTaskStatus, todoListID);
                }

                return (
                    <ListItem
                        key={task.id}
                        secondaryAction={
                            <IconButton onClick={() => deleteTask(task.id, todoListID)} aria-label="delete" size="small">
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
                                    onChange={changeTaskStatusHandler}
                                />
                            </ListItemIcon>
                            <EditableSpan sx={getListItemSx(task.isComplete)}
                                          value={task.taskName}
                                          onChange={(title) => changeTaskTitleHandler(title, task.id)}/>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );

};
