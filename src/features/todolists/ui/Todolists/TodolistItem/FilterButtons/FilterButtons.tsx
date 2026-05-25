import {filterButtonBoxSx} from '@/common/styles/Todolist.styles.ts';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {changeTodolistFilterAC} from '@/features/todolists/model/todolists-reducer.ts';
import {FilterTypes, TodoListType} from '@/common/types/Types.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    todolist: TodoListType;
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist;

    const dispatch = useAppDispatch();

    const changeTodolistFilter = (filter: FilterTypes, todolistID: TodoListType["id"]) => {
        dispatch(changeTodolistFilterAC({filter, id: todolistID}))
    }

    return (
        <Box sx={filterButtonBoxSx}>
            <Button onClick={() => changeTodolistFilter("all", id)}
                    variant={(filter === "all") ? "contained" : "outlined"}
                    size={"small"}>All</Button>
            <Button onClick={() => changeTodolistFilter("active", id)}
                    variant={(filter === "active") ? "contained" : "outlined"} color="secondary"
                    size={"small"}>Active</Button>
            <Button onClick={() => changeTodolistFilter("completed", id)}
                    variant={(filter === "completed") ? "contained" : "outlined"} color="success"
                    size={"small"}>Completed</Button>
        </Box>
    )
}