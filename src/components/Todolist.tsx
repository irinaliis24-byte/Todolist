import {Button} from "./Button.tsx";
import {FilterTypes} from "../App.tsx";

export type TodolistProps = {
    title: string
    tasks: TasksProps[]
    date?: string
    deleteTask: (taskID: number) => void;
    changeFilter: (filter: FilterTypes) => void;
}

type TasksProps = {
    id: number
    taskName: string
    isComplete: boolean
}

export const Todolist = ({title, tasks, date, deleteTask, changeFilter}: TodolistProps) => {

    const tasksList = tasks.length === 0 ?
        <span>This list is empty</span>
        : <ul>
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

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button text="+"/>
            </div>
            {tasksList}
            <div>
                <Button text="All" onClick={() => changeFilter("all")}/>
                <Button text="Active" onClick={() => changeFilter("active")}/>
                <Button text="Completed" onClick={() => changeFilter("completed")}/>
            </div>
            <div>{date}</div>
        </div>
    );
};
