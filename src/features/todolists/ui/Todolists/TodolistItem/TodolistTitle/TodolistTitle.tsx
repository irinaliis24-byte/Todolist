import { headerBoxSx } from "@/common/styles/Todolist.styles.ts"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolist } from "@/common/types/types.ts"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <Box sx={headerBoxSx}>
      <Typography variant="h5" >
        <EditableSpan value={title} onChange={changeTodolistTitle}/>
      </Typography>
      <IconButton onClick={deleteTodolistHandler} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" color='info'/>
      </IconButton>
    </Box>
  )
}