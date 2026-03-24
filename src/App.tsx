import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {FilterTypes, TasksProps} from "./types/Types.ts";


export const App = () => {
      //data
      const todoListTitle_1: string = "What to learn";

      const [tasks, setTasks] = useState ([
        { id: v1(), taskName: "CSS", isComplete: true },
        { id: v1(), taskName: "HTML", isComplete: true },
        { id: v1(), taskName: "React", isComplete: false },
        { id: v1(), taskName: "Redux", isComplete: false },
      ])
      //

    const [filter, setFilter] = useState<FilterTypes>("all");

    const changeFilter = (filter: FilterTypes) => {
          setFilter(filter)
    }

      let filteredTasks = tasks;
      if (filter === "active") {
            filteredTasks = tasks.filter(task => !task.isComplete);
      }
      if (filter === "completed") {
            filteredTasks = tasks.filter(task => task.isComplete);
      }

    const deleteTask = (taskID: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(filteredTasks);
    }

    const createTask = (taskName: string) => {
        const newTask = {id: v1(), taskName, isComplete: false};
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

      const changeTaskStatus = (taskId: TasksProps["id"], isDone: TasksProps["isComplete"]) => {
            const newState = tasks.map(task => (task.id === taskId) ? ({...task, isComplete: isDone}) : task)
            setTasks(newState);
      }

  return (
      <div className="app">
        <TodolistItem title={todoListTitle_1}
                      tasks={filteredTasks}
                      date="04.03.2026"
                      deleteTask = {deleteTask}
                      changeFilter = {changeFilter}
                      createTask = {createTask}
                      changeTaskStatus = {changeTaskStatus}
                      filter = {filter}
        />
      </div>
  )
}

