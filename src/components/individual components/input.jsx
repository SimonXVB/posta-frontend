export function Input({ name, onChange, value, placeholder }) {
    return (
        <div className="font-mono font-semibold flex flex-col m-3 ml-0">
            <label >{name}</label>
            <input type="text" onChange={onChange} value={value} placeholder={placeholder} className="border-b-2 border-purple-500 outline-none focus:border-purple-300"/>
        </ div>
    )
};