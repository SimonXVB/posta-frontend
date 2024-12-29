export function Button({ name, onClick, type }) {
    return(
        <button onClick={onClick} type={type} className="m-2 p-1 ml-0 font-mono font-semibold border-2 border-purple-500 hover:bg-white">{name}</button>
    )
};