import {FilterTypes, TasksProps} from "../types/Types.ts";

export const getFilteredTasks = (tasks: TasksProps[], filter: FilterTypes): TasksProps[] => {
    switch (filter) {
        case "active":
            return tasks.filter(t => !t.isComplete)
        case "completed":
            return tasks.filter(t => t.isComplete)
        default:
            return tasks;
    }
}