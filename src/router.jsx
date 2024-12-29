import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/login";
import { LoginHome } from "./pages/loginHome";
import { LogoutHome } from "./pages/logoutHome";
import { useFetchCurrentUser } from "./hooks/user hooks/useFetchCurrentUser";
import { useEffect } from "react";
import { Profile } from "./pages/profile";
import { NotFound } from "./pages/notFound";
import { CurrentPost } from "./pages/currentPost";
import { CurrentContext } from "./context/currenUserContext";

export function Router() {
    const { fetchCurrentUser, currentUser, currentUserLoading } = useFetchCurrentUser();

    useEffect(() => {
        fetchCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CurrentContext value={{currentUser, currentUserLoading}}>
            <BrowserRouter>
                <Routes>
                    {!currentUserLoading &&
                    <>
                            <Route path="*" element={<NotFound />}/>
                            <Route path="/" element={!currentUser ? <LogoutHome /> : <LoginHome />}/>
                            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={"/"}/>}/>
                            <Route path="/user/:userId" element={<Profile />}/>
                            <Route path="/post/:postId" element={<CurrentPost />}/>
                    </>
                    }
                </Routes>
            </BrowserRouter>
        </CurrentContext>
    )
};