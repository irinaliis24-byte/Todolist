import {Button} from "./Button.tsx";
import {TodolistProps} from "../types/Types.ts";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksList} from "./TasksList.tsx";

export const TodolistItem = (props: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null);
    }

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if (trimmedTaskTitle !== "") {
            props.createTask(trimmedTaskTitle);
            setTaskTitle("");
        } else {
            setError("Title cannot be empty");
        }
        }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {if (event.key === "Enter") { createTaskHandler()}}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={setTaskTitleHandler}
                                        onKeyDown={createTaskOnEnterHandler}
                                        className={error ? "error" : ""}/>
                <Button text="+" onClick={() => createTaskHandler()}/>
                {error && <div className="error-message">{error}</div>}
            </div>
                <TasksList tasks={props.tasks}
                           deleteTask={props.deleteTask}
                           changeTaskStatus={props.changeTaskStatus}/>
            <div>
                <Button text="All" onClick={() => props.changeFilter("all")} className={(props.filter === "all") ? "active-filter" : ""}/>
                <Button text="Active" onClick={() => props.changeFilter("active")} className={(props.filter === "active") ? "active-filter" : ""}/>
                <Button text="Completed" onClick={() => props.changeFilter("completed")} className={(props.filter === "completed") ? "active-filter" : ""}/>
            </div>
            <div>{props.date}</div>
        </div>
    );
};
