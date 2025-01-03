import { useState } from "react";
import { useNavigate } from "react-router";

export function useLogin() {
    const [error, setError] = useState(null);
    const nav = useNavigate();

    async function login(e, username, password) {
        e.preventDefault();

        const res = await fetch(import.meta.env.VITE_BASE_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            credentials: "include"
        }); 
        const json = await res.json();

        if(json === "login") {
            await nav("/");
            window.location.reload();
        } else {
            setError(json);
        };
    };

    async function logout() {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }); 
        const json = await res.json();

        if(json === "logout") {
            await nav("/");
            window.location.reload();
        };
    };

    return { login, logout, error, setError }
};