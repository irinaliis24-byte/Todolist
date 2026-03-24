
type BtnProps = {
    text: string;
    onClick?: () => void;
    className?: string;
}

export const Button = ({text, onClick, className}: BtnProps) => {
    return (
        <button onClick={onClick} className={className}>
            {text}
        </button>
    );
};
