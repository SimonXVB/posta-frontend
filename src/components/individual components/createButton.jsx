export function CreateButton({ name, onClick }) {
    return (
        <div className="bottom-0 bg-purple-400 fixed p-3 text-center font-bold cursor-pointer max-w-455 w-full" onClick={onClick}>
            <p>{name}</p>
        </div>
    )
};