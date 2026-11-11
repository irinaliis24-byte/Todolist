import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { gridContainerSx } from "@/common/styles/Todolist.styles.ts"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useAddTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"


export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

    return(
        <Container className="app" fixed maxWidth="xl">
            <Grid container sx={gridContainerSx}>
                <CreateItemForm createTitle={addTodolist}/>
            </Grid>
            <Grid container spacing={10}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
