import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type ItemProps = {
    createTitle: (title: string) => void;
}

export const CreateItemForm = (props: ItemProps) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState(false);

    const setItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setItemTitle(event.currentTarget.value)
    }

    const createTitleHandler = () => {
        const trimmedItemTitle = itemTitle.trim();
        if (trimmedItemTitle !== "") {
            props.createTitle(trimmedItemTitle);
            setItemTitle("");
        } else {
            setError(true);
        }
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {if (event.key === "Enter") { createTitleHandler()}}


    return (
        <div>
            <input value={itemTitle} onChange={setItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}
                   className={error ? "error" : ""}/>
            <Button text="+" onClick={createTitleHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
