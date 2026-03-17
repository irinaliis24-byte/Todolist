import './App.css'
import {Todolist} from "./components/Todolist.tsx";
import {useState} from "react";

export type FilterTypes = "all" | "active" | "completed"

export const App = () => {
      //data
      const todoListTitle_1: string = "What to learn";

      const [tasks, setTasks] = useState ([
        { id: 1, taskName: "CSS", isComplete: true },
        { id: 2, taskName: "HTML", isComplete: true },
        { id: 3, taskName: "React", isComplete: false },
        { id: 4, taskName: "Redux", isComplete: false },
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

    const deleteTask = (taskID: number) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(filteredTasks);
    }

  return (
      <div className="app">
        <Todolist title={todoListTitle_1}
                  tasks={filteredTasks}
                  date="04.03.2026"
                  deleteTask = {deleteTask}
                  changeFilter = {changeFilter}  />
      </div>
  )
}

