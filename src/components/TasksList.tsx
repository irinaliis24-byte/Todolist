import {TasksListProps} from "../types/Types.ts";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";

export const TasksList = ({tasks, deleteTask, changeTaskStatus}: TasksListProps) => {

    {
        if (tasks.length === 0) {
            return <span>This list is empty</span>;
        }
    }


    return (
        <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = e.currentTarget.checked;
                    changeTaskStatus(task.id, newTaskStatus);
                }
                return (
                    <li key={task.id} className={task.isComplete ? "is-done" : ""}>
                        <input type="checkbox"
                               key={task.id}
                               checked={task.isComplete}
                               onChange={changeTaskStatusHandler}/>
                        <span>{task.taskName}</span>
                        <Button text="x" onClick={() => deleteTask(task.id)}/>
                    </li>
                )
            })}
        </ul>
    );
};
