import {TasksListProps} from "../types/Types.ts";
import {Button} from "./Button.tsx";

export const TasksList = ({tasks, deleteTask}: TasksListProps) => {

    {
        if (tasks.length === 0) {
            return <span>This list is empty</span>;
        }
    }

    return (
        <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" key={task.id} checked={task.isComplete}/>
                        <span>{task.taskName}</span>
                        <Button text="x" onClick={() => deleteTask(task.id)}/>
                    </li>
                )
            })}
        </ul>
    );
};
