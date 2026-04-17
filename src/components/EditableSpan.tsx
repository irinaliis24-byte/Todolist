import {ChangeEvent, useState} from "react";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
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
                <input value={title}
                       onChange={changeTitleHandler}
                       autoFocus
                       onBlur={turnOffEditMode}/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};
