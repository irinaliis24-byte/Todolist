import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {gridContainerSx} from '@/common/styles/Todolist.styles.ts';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists.tsx';
import {TodoListType} from '@/common/types/Types.ts';
import {createTodolistAC} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';


export const Main = () => {
    const dispatch = useAppDispatch();

    const createTodolist = (title: TodoListType["title"]) => {
        dispatch(createTodolistAC(title))
    }

    return(
        <Container className="app" fixed maxWidth="xl">
            <Grid container sx={gridContainerSx}>
                <CreateItemForm createTitle={createTodolist}/>
            </Grid>
            <Grid container spacing={10}>
                <Todolists/>
            </Grid>
        </Container>
    )
}