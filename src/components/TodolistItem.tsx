import {Button} from "./Button.tsx";
import {TodolistProps} from "../types/Types.ts";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksList} from "./TasksList.tsx";

export const TodolistItem = ({title, date, tasks, deleteTask, changeFilter, createTask}: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState("");

    const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)

    const createTaskHandler = () => {
        createTask(taskTitle);
        setTaskTitle("");}

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {if (event.key === "Enter") { createTaskHandler()}}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={setTaskTitleHandler}
                                        onKeyDown={createTaskOnEnterHandler}/>
                <Button text="+" onClick={() => createTaskHandler()}/>
            </div>
                <TasksList tasks={tasks} deleteTask={deleteTask}/>
            <div>
                <Button text="All" onClick={() => changeFilter("all")}/>
                <Button text="Active" onClick={() => changeFilter("active")}/>
                <Button text="Completed" onClick={() => changeFilter("completed")}/>
            </div>
            <div>{date}</div>
        </div>
    );
};
