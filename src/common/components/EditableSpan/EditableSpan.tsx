import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import {SxProps, Theme} from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
    sx?:  SxProps<Theme> | undefined
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({sx, value, onChange}: Props) => {
    const [title, setTitle] = useState<string>(value)
    const [editMode, setEditMode] = useState<boolean>(false);

    const turnOnEditMode = () => {
        setEditMode(true);
    }

    const turnOffEditMode = () => {
        setEditMode(false);
        onChange(title);
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <TextField variant="standard"
                    value={title}
                       onChange={changeTitleHandler}
                       autoFocus
                       onBlur={turnOffEditMode}/>
            ) : (
                <Box sx={sx}>
                    <span onDoubleClick={turnOnEditMode}>{value}</span>
                </Box>
                )}
        </>
    );
};
