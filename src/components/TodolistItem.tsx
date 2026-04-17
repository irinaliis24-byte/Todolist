import {Button} from "./Button.tsx";
import {TodoListType} from "../types/Types.ts";
import {TasksList} from "./TasksList.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export const TodolistItem = (props: TodoListType) => {

    const createTaskHandler = (title: TodoListType["title"]) => {
        props.createTask(title, props.id)
    }

    const changeTodolistTitleHandler = (title: TodoListType["title"]) => {
        props.changeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitleHandler}/>
                <Button text={"x"} onClick={() => props.deleteTodolist(props.id)}/>
            </h3>
            <div>
                <Button text="All" onClick={() => props.changeFilter("all", props.id)} className={(props.filter === "all") ? "active-filter" : ""}/>
                <Button text="Active" onClick={() => props.changeFilter("active", props.id)} className={(props.filter === "active") ? "active-filter" : ""}/>
                <Button text="Completed" onClick={() => props.changeFilter("completed", props.id)} className={(props.filter === "completed") ? "active-filter" : ""}/>
            </div>
            <CreateItemForm createTitle={createTaskHandler}/>
                <TasksList tasks={props.tasks}
                           deleteTask={props.deleteTask}
                           changeTaskStatus={props.changeTaskStatus}
                           changeTaskTitle={props.changeTaskTitle}
                            todoListID={props.id}/>
        </div>
    );
};
