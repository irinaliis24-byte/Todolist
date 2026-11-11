import { ListItem } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { DomainTodolist } from "@/common/types/types.ts"
import { ChangeEvent } from "react"
import { getListItemSx } from "@/common/styles/Todolist.styles.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { TaskStatus } from "@/common/enums"
import { createTaskModel } from "@/features/todolists/lib/utils"
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const deleteTask = () => {
        removeTask({ todolistId: todolist.id, taskId: task.id })
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const model = createTaskModel(task, { status })
        updateTask({ taskId: task.id, todolistId: todolist.id, model })
    }

    const changeTaskTitle = (title: string) => {
        const model = createTaskModel(task, { title })
        updateTask({ taskId: task.id, todolistId: todolist.id, model })
    }

    const isTaskCompleted = task.status === TaskStatus.Completed

    return (
      <ListItem sx={getListItemSx(isTaskCompleted)}>
          <div>
              <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
              <EditableSpan value={task.title} onChange={changeTaskTitle} />
          </div>
          <IconButton onClick={deleteTask}>
              <DeleteIcon />
          </IconButton>
      </ListItem>
    )
}