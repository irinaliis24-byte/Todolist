//import {Button} from "./Button.tsx";
import Button from '@mui/material/Button';
import {TodoListType} from "../types/Types.ts";
import {TasksList} from "./TasksList.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import {filterButtonBoxSx, headerBoxSx} from "../styles/Todolist.styles.ts";
import Typography from '@mui/material/Typography';

export const TodolistItem = (props: TodoListType) => {

    const createTaskHandler = (title: TodoListType["title"]) => {
        props.createTask(title, props.id)
    }

    const changeTodolistTitleHandler = (title: TodoListType["title"]) => {
        props.changeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <Box sx={headerBoxSx}>
                <Typography variant="h5" >
                    <EditableSpan value={props.title} onChange={changeTodolistTitleHandler}/>
                </Typography>
                <IconButton onClick={() => props.deleteTodolist(props.id)} aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" color='info'/>
                </IconButton>
                {/*<Button text={"x"} onClick={() => props.deleteTodolist(props.id)}/>*/}
            </Box>
            <Box sx={filterButtonBoxSx}>
                <Button onClick={() => props.changeFilter("all", props.id)}
                        variant={(props.filter === "all") ? "contained" : "outlined"}
                        size={"small"}>All</Button>
                <Button onClick={() => props.changeFilter("active", props.id)}
                        variant={(props.filter === "active") ? "contained" : "outlined"} color="secondary"
                        size={"small"}>Active</Button>
                <Button onClick={() => props.changeFilter("completed", props.id)}
                        variant={(props.filter === "completed") ? "contained" : "outlined"} color="success"
                        size={"small"}>Completed</Button>
                {/*<Button text="All" onClick={() => props.changeFilter("all", props.id)} className={(props.filter === "all") ? "active-filter" : ""}/>*/}
                {/*<Button text="Active" onClick={() => props.changeFilter("active", props.id)} className={(props.filter === "active") ? "active-filter" : ""}/>*/}
                {/*<Button text="Completed" onClick={() => props.changeFilter("completed", props.id)} className={(props.filter === "completed") ? "active-filter" : ""}/>*/}
            </Box>
            <CreateItemForm createTitle={createTaskHandler}/>
            <TasksList tasks={props.tasks}
                       deleteTask={props.deleteTask}
                       changeTaskStatus={props.changeTaskStatus}
                       changeTaskTitle={props.changeTaskTitle}
                       todoListID={props.id}/>
        </div>
    );
};
