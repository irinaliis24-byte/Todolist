import {Button} from "./Button.tsx";
import {TodoListType} from "../types/Types.ts";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksList} from "./TasksList.tsx";

export const TodolistItem = (props: TodoListType) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null);
    }

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if (trimmedTaskTitle !== "") {
            props.createTask(trimmedTaskTitle, props.id);
            setTaskTitle("");
        } else {
            setError("Title cannot be empty");
        }
        }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {if (event.key === "Enter") { createTaskHandler()}}

    return (
        <div>
            <h3>{props.title}
                <Button text={"x"} onClick={() => props.deleteTodolist(props.id)}/>
            </h3>
            <div>
                <input value={taskTitle} onChange={setTaskTitleHandler}
                                        onKeyDown={createTaskOnEnterHandler}
                                        className={error ? "error" : ""}/>
                <Button text="+" onClick={() => createTaskHandler()}/>
                {error && <div className="error-message">{error}</div>}
            </div>
                <TasksList tasks={props.tasks}
                           deleteTask={props.deleteTask}
                           changeTaskStatus={props.changeTaskStatus}
                            todoListID={props.id}/>
            <div>
                <Button text="All" onClick={() => props.changeFilter("all", props.id)} className={(props.filter === "all") ? "active-filter" : ""}/>
                <Button text="Active" onClick={() => props.changeFilter("active", props.id)} className={(props.filter === "active") ? "active-filter" : ""}/>
                <Button text="Completed" onClick={() => props.changeFilter("completed", props.id)} className={(props.filter === "completed") ? "active-filter" : ""}/>
            </div>
        </div>
    );
};
