import { DomainTodolist } from "@/common/types/types.ts"
import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/TasksList/TaskItem/TaskItem.tsx"
import { useEffect, useState } from "react"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { useDispatch } from "react-redux"
import { TaskStatus } from "@/common/enums"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { PAGE_SIZE } from "@/common/constans"
import {
    TasksPagination
} from "@/features/todolists/ui/Todolists/TodolistItem/TasksList/TasksPagination/TasksPagination.tsx"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/TasksList/TasksSkeleton/TasksSkeleton.tsx"

type Props = {
    todolist: DomainTodolist
}

export const TasksList = ({ todolist }: Props) => {
    const { id, filter } = todolist

    const [page, setPage] = useState(1)

    const { data, isLoading, error } = useGetTasksQuery({ todolistId: id, params: { page } })
    const dispatch = useDispatch()

    let filteredTasks = data?.items
    if (filter === "active") {
        filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
        filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
    }

    useEffect(() => {
        if (!error) return
        if ("status" in error) {
            // FetchBaseQueryError
            const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
            dispatch(setAppErrorAC({ error: errMsg }))
        } else {
            // SerializedError
            dispatch(setAppErrorAC({ error: error.message || "Some error occurred" }))
        }
    }, [error])

    if (isLoading) {
        return <TasksSkeleton />
    }

    return (
      <>
          {filteredTasks?.length === 0 ? (
            <p>This list is empty</p>
          ) : (
            <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {filteredTasks?.map((task) => (
                      <TaskItem key={task.id} task={task} todolist={todolist} />
                    ))}
                </List>
                {data?.totalCount && data?.totalCount > PAGE_SIZE && (
                  <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
                )}
            </>
          )}
      </>
    )
}
