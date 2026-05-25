import {headerBoxSx} from '@/common/styles/Todolist.styles.ts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodoListType} from '@/common/types/Types.ts';
import {changeTodolistTitleAC, deleteTodolistAC} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';


type Props = {
    todolist: TodoListType;
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist;
    const dispatch = useAppDispatch();

    const changeTodolistTitle = (title: TodoListType["title"]) => {
        dispatch(changeTodolistTitleAC({id, title}));
    }

    const deleteTodolistHandler = (todolistID: TodoListType["id"]) => {
        dispatch(deleteTodolistAC({id: todolistID}))
    }

    return (
        <Box sx={headerBoxSx}>
            <Typography variant="h5" >
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </Typography>
            <IconButton onClick={() => deleteTodolistHandler(id)} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" color='info'/>
            </IconButton>
        </Box>
    )
}