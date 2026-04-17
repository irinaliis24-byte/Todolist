import {TasksListProps} from "../types/Types.ts";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";

export const TasksList = ({tasks, deleteTask, changeTaskStatus, todoListID, changeTaskTitle}: TasksListProps) => {

    {
        if (tasks.length === 0) {
            return <span>This list is empty</span>;
        }
    }

    const changeTaskTitleHandler = (title: string, taskId: string) => {
            changeTaskTitle(todoListID, taskId, title)
    }

    return (
        <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = e.currentTarget.checked;
                    changeTaskStatus(task.id, newTaskStatus, todoListID);
                }

                return (
                    <li key={task.id} className={task.isComplete ? "is-done" : ""}>
                        <input type="checkbox"
                               key={task.id}
                               checked={task.isComplete}
                               onChange={changeTaskStatusHandler}/>
                        <EditableSpan value={task.taskName} onChange={(title) => changeTaskTitleHandler(title, task.id)}/>
                        <Button text="x" onClick={() => deleteTask(task.id, todoListID)}/>
                    </li>
                )
            })}
        </ul>
    );
};
