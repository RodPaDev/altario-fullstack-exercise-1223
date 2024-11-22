import "./grid.css"

type GridProps = {
    data?: string;
}

export default function Grid(props: GridProps) {
    const { data = new Array(100).fill(" ").join("") } = props;

    if (data && data.length !== 100) {
        throw new Error("Generated grid must contain exactly 100 characters.");
    }

    return (
        <div className="grid-container">
            {data.split("").map((char, index) => (
                <div className="grid-cell" key={index}>
                    {char}
                </div>
            ))}
        </div>
    );
}
