import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {FilterTypes, TasksProps, TasksStateType, TodoListType} from "./types/Types.ts";
import {getFilteredTasks} from "./utilits/Utilits.ts";


export const App = () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        { id: todolistID_1, title: "What to learn", filter: "all"},
        { id: todolistID_2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            { id: v1(), taskName: "CSS", isComplete: true },
            { id: v1(), taskName: "HTML", isComplete: true },
            { id: v1(), taskName: "React", isComplete: false },
            { id: v1(), taskName: "Redux", isComplete: false },
        ],
        [todolistID_2]: [
            { id: v1(), taskName: "Milk", isComplete: true },
            { id: v1(), taskName: "Bread", isComplete: true },
            { id: v1(), taskName: "Meat", isComplete: false },
            { id: v1(), taskName: "Salt", isComplete: false },
        ],
    });


    const deleteTask = (taskID: TasksProps["id"], todolistID: TodoListType["id"]) => {
        const todolistForDeleteTask = tasks[todolistID];
        const filteredTasks = todolistForDeleteTask.filter(task => task.id !== taskID);
        const updatedTasks = {...tasks, [todolistID]: filteredTasks};

        setTasks(updatedTasks);
    }

    const createTask = (taskName: TasksProps["taskName"], todolistID: TodoListType["id"]) => {
        const newTask: TasksProps = {id: v1(), taskName, isComplete: false};
        const todolistForAddTask = tasks[todolistID];
        const newTasks = [...todolistForAddTask , newTask];
        const updatedTasks = {...tasks, [todolistID]: newTasks};

        setTasks(updatedTasks)
    }

    const changeTaskStatus = (taskId: TasksProps["id"], isDone: TasksProps["isComplete"], todolistID: TodoListType["id"]) => {
        const todolistForChangeTaskStatus = tasks[todolistID];
        const newStatus = todolistForChangeTaskStatus.map(task => (task.id === taskId) ? ({...task, isComplete: isDone}) : task);
        const updatedTasks = {...tasks, [todolistID]: newStatus};

        setTasks(updatedTasks);
    }

    const changeTodolistFilter = (filter: FilterTypes, todolistID: TodoListType["id"]) => {
        setTodoLists(todoLists.map((tl) => tl.id === todolistID ? {...tl, filter: filter } : tl));
    }

    const deleteTodolist = (todolistID: TodoListType["id"]) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== todolistID));
        const copyTasksState = {...tasks};
        delete copyTasksState[todolistID];
        setTasks(copyTasksState);
    }

    const todolistsComponent = todoLists.map((tl) => {
        return(
                <TodolistItem key={tl.id}
                    id={tl.id}
                    title={tl.title}
                              tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                              deleteTask = {deleteTask}
                              changeFilter = {changeTodolistFilter}
                              createTask = {createTask}
                              changeTaskStatus = {changeTaskStatus}
                              filter = {tl.filter}
                              deleteTodolist = {deleteTodolist}
                />
        )});

  return (
      <div className="app">
          {todolistsComponent}
      </div>
  )
}

