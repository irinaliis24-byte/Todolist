import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {FilterTypes, TasksProps, TodoList, TodoListType} from "./types/Types.ts";
import {getFilteredTasks} from "./utilits/Utilits.ts";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import {ButtonAppBar} from "./components/ButtonAppBar.tsx";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {gridContainerSx} from "./styles/Todolist.styles.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reduser.ts";


export const App = () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID_1]: [
            {id: v1(), taskName: "CSS", isComplete: true},
            {id: v1(), taskName: "HTML", isComplete: true},
            {id: v1(), taskName: "React", isComplete: false},
            {id: v1(), taskName: "Redux", isComplete: false},
        ],
        [todolistID_2]: [
            {id: v1(), taskName: "Milk", isComplete: true},
            {id: v1(), taskName: "Bread", isComplete: true},
            {id: v1(), taskName: "Meat", isComplete: false},
            {id: v1(), taskName: "Salt", isComplete: false},
        ],
    })

// actions with task
    const deleteTask = (taskID: TasksProps["id"], todolistID: TodoListType["id"]) => {
        dispatchTasks(deleteTaskAC({taskID, todolistID}));
    }

    const createTask = (taskName: TasksProps["taskName"], todolistID: TodoListType["id"]) => {
        dispatchTasks(createTaskAC({taskName, todolistID}));
    }

    const changeTaskStatus = (taskID: TasksProps["id"], isDone: TasksProps["isComplete"], todolistID: TodoListType["id"]) => {
        dispatchTasks(changeTaskStatusAC({taskID, isDone, todolistID}));
    }

    const changeTaskTitle = (todolistID: TasksProps["id"], taskID: TasksProps["taskName"], taskName: string) => {
        dispatchTasks(changeTaskTitleAC({todolistID, taskName, taskID}))
    }


// actions with todolist
    const changeTodolistFilter = (filter: FilterTypes, todolistID: TodoList["id"]) => {
        dispatchTodoLists(changeTodolistFilterAC({filter, id: todolistID}))
    }

    const deleteTodolist = (todolistID: TodoList["id"]) => {
        const action = deleteTodolistAC(todolistID);
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const createTodolist = (title: TodoList["title"]) => {
        const action = createTodolistAC(title);
        dispatchTodoLists(action);
        dispatchTasks(action)
    }

    const changeTodolistTitle = (todolistId: TodoList["id"], title: string) => {
        dispatchTodoLists(changeTodolistTitleAC({id: todolistId, title}));
    }


    type ThemeMode = 'dark' | 'light'

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },})

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

        if (!todoLists) return null;
    const todolistsComponent = todoLists.map((tl) => {
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
            <CssBaseline />
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

