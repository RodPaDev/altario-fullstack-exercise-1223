import "./input.css";

type Input = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
    placeholder?: string;
    type?: string;
};

export default function Input({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
}: Input) {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input
                className="input-field"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
