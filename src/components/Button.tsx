
type BtnProps = {
    text: string
    onClick?: () => void;
}

export const Button = ({text, onClick}: BtnProps) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};
