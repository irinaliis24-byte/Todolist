import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {FilterTypes, TasksProps, TasksStateType, TodoList, TodoListType} from "./types/Types.ts";
import {getFilteredTasks} from "./utilits/Utilits.ts";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import {ButtonAppBar} from "./components/ButtonAppBar.tsx";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {gridContainerSx} from "./styles/Todolist.styles.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


export const App = () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoList[]>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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
    });

// actions with task
    const deleteTask = (taskID: TasksProps["id"], todolistID: TodoListType["id"]) => {
        const todolistForDeleteTask = tasks[todolistID];
        const filteredTasks = todolistForDeleteTask.filter(task => task.id !== taskID);
        const updatedTasks = {...tasks, [todolistID]: filteredTasks};

        setTasks(updatedTasks);
    }

    const createTask = (taskName: TasksProps["taskName"], todolistID: TodoListType["id"]) => {
        const newTask: TasksProps = {id: v1(), taskName, isComplete: false};
        const todolistForAddTask = tasks[todolistID];
        const newTasks = [...todolistForAddTask, newTask];
        const updatedTasks = {...tasks, [todolistID]: newTasks};

        setTasks(updatedTasks)
    }

    const changeTaskStatus = (taskId: TasksProps["id"], isDone: TasksProps["isComplete"], todolistID: TodoListType["id"]) => {
        const todolistForChangeTaskStatus = tasks[todolistID];
        const newStatus = todolistForChangeTaskStatus.map(task => (task.id === taskId) ? ({
            ...task,
            isComplete: isDone
        }) : task);
        const updatedTasks = {...tasks, [todolistID]: newStatus};

        setTasks(updatedTasks);
    }

    const changeTaskTitle = (todolistId: TasksProps["id"], taskId: TasksProps["taskName"], taskName: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((task) => task.id === taskId ? {...task, taskName} : task)
        });
    }


// actions with todolist
    const changeTodolistFilter = (filter: FilterTypes, todolistID: TodoListType["id"]) => {
        setTodoLists(todoLists.map((tl) => tl.id === todolistID ? {...tl, filter: filter} : tl));
    }

    const deleteTodolist = (todolistID: TodoListType["id"]) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== todolistID));
        const copyTasksState = {...tasks};
        delete copyTasksState[todolistID];
        setTasks(copyTasksState);
    }

    const createTodolist = (title: TodoList["title"]) => {
        const newTodoList: TodoList = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList]);
        setTasks({...tasks, [newTodoList.id]: []});
    }

    const changeTodolistTitle = (todolistId: TasksProps["id"], title: string) => {
        setTodoLists(todoLists.map((todolist) => todolist.id === todolistId ? {...todolist, title} : todolist))
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

