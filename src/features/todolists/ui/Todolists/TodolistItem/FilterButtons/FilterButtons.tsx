import { containerSx } from "@/common/styles/Todolist.styles.ts"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { DomainTodolist, FilterValues } from "@/common/types/types.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists: DomainTodolist[]) => {
        const todolist = todolists.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      })
    )
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "contained" : "outlined"}
              size={"small"}
              onClick={() => changeFilter("all")}
      >
        All
      </Button>
      <Button variant={filter === "active" ? "contained" : "outlined"}
              size={"small"}
              onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button variant={filter === "completed" ? "contained" : "outlined"}
              size={"small"}
              onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}