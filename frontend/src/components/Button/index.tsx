import "./button.css";

type ButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
};

export default function Button({
    label,
    onClick,
    disabled = false,
}: ButtonProps) {
    return (
        <button className="button" onClick={onClick} type="button" disabled={disabled}>
            {label}
        </button>
    );
}
