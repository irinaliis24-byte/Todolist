import './App.css'
import {TodolistItem} from "../components/TodolistItem.tsx";
import {useState} from "react";
import {FilterTypes, TasksProps, TodoList, TodoListType} from "../types/Types.ts";
import {getFilteredTasks} from "../utilits/Utilits.ts";
import {CreateItemForm} from "../components/CreateItemForm.tsx";
import {ButtonAppBar} from "../components/ButtonAppBar.tsx";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {gridContainerSx} from "../styles/Todolist.styles.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC
} from "../model/tasks-reduser.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";


export const App = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch();


// actions with task
    const deleteTask = (taskID: TasksProps["id"], todolistID: TodoListType["id"]) => {
        dispatch(deleteTaskAC({taskID, todolistID}));
    }

    const createTask = (taskName: TasksProps["taskName"], todolistID: TodoListType["id"]) => {
        dispatch(createTaskAC({taskName, todolistID}));
    }

    const changeTaskStatus = (taskID: TasksProps["id"], isDone: TasksProps["isComplete"], todolistID: TodoListType["id"]) => {
        dispatch(changeTaskStatusAC({taskID, isDone, todolistID}));
    }

    const changeTaskTitle = (todolistID: TasksProps["id"], taskID: TasksProps["taskName"], taskName: string) => {
        dispatch(changeTaskTitleAC({todolistID, taskName, taskID}))
    }


// actions with todolist
    const changeTodolistFilter = (filter: FilterTypes, todolistID: TodoList["id"]) => {
        dispatch(changeTodolistFilterAC({filter, id: todolistID}))
    }

    const deleteTodolist = (todolistID: TodoList["id"]) => {
        dispatch(deleteTodolistAC({id: todolistID}))
    }

    const createTodolist = (title: TodoList["title"]) => {
        dispatch(createTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: TodoList["id"], title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}));
    }


    type ThemeMode = 'dark' | 'light'

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    if (!todolists) return null;
    const todolistsComponent = todolists.map((tl) => {
        return (
            <Grid key={tl.id}>
                <Paper elevation={4} sx={{p: "20px"}}>
                    <TodolistItem id={tl.id}
                                  title={tl.title}
                                  tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                                  deleteTask={deleteTask}
                                  changeFilter={changeTodolistFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}
                                  deleteTodolist={deleteTodolist}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container className="app" fixed maxWidth="xl">
                <ButtonAppBar onChangeMode={changeMode}/>
                <Grid container sx={gridContainerSx}>
                    <CreateItemForm createTitle={createTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todolistsComponent}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

