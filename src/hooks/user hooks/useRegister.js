import { useState } from "react";

export function useRegister() {
    const [regError, setRegError] = useState(null);
    const [created, setCreated] = useState(null);

    async function register(e, username, password, bio) {
        e.preventDefault();

        const res = await fetch(import.meta.env.VITE_BASE_URL + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "bio": bio
            }),
            credentials: "include"
        });
        const json = await res.json();

        if(json === "error") {
            setRegError(json);
        };

        if(json === "empty") {
            setRegError(json);
        };

        if(json === "created") {
            setCreated(json);
        };
    };

    return { register, regError, setRegError, created, setCreated };
};