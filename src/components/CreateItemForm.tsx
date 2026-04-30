// import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';

type ItemProps = {
    createTitle: (title: string) => void;
}

export const CreateItemForm = (props: ItemProps) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const setItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setItemTitle(event.currentTarget.value)
    }

    const createTitleHandler = () => {
        const trimmedItemTitle = itemTitle.trim();
        if (trimmedItemTitle !== "") {
            props.createTitle(trimmedItemTitle);
            setItemTitle("");
        } else {
            setError("Title cannot be empty");
        }
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {if (event.key === "Enter") { createTitleHandler()}}


    return (
        <div className="createItemForm">
            <TextField id="outlined-basic" label={error ? error : "Title"} variant="outlined"
                       size="small"
                       value={itemTitle} onChange={setItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}
                       error={!!error}
                        onBlur={()=>setError(null)}/>
            <IconButton onClick={createTitleHandler} aria-label="create" size="large" >
                <AddBoxIcon fontSize="inherit" color="primary" />
            </IconButton>
        </div>
    );
};
