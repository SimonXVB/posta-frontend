import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { CurrentUserContext } from "../context/currenUserContext";
import { useFetchFollowingPosts } from "../hooks/home hooks/useFetchFollowingPosts";
import { FollowingPosts } from "../components/home components/homeFollowingPosts";
import { useLogin } from "../hooks/user hooks/useLogin";
import { FindModal } from "../components/home components/findModal";

export function LoginHome() {
    const [findModal, setFindModal] = useState(false);

    const { logout } = useLogin();
    const { currentUser } = useContext(CurrentUserContext);
    const { fetchFollowingPosts, followingPosts, followingPostsLoading } = useFetchFollowingPosts();

    useEffect(() => {
        fetchFollowingPosts(currentUser.id);   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {followingPostsLoading && <p>Loading...</p>}
            {!followingPostsLoading &&
                <div className="flex justify-center">
                    <div className="flex items-center flex-col font-sans max-w-455 w-full">
                        <div className="border-x-2 border-purple-400 min-h-screen w-full">
                            <nav className="flex justify-between font-black text-2xl sticky py-3 top-0 bg-purple-400 px-5">
                                <Link to={`/user/${currentUser.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                                </Link>
                                <Link to={"/"}>
                                    Posta
                                </Link>
                                <button onClick={() => logout()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                                </button>
                            </nav>
                            <button className="w-full font-black p-3 bg-purple-300 hover:bg-purple-400" onClick={() => setFindModal(true)}>Find New People</button>
                            <FollowingPosts posts={followingPosts}/>
                        </div>
                    </div>
                    {findModal && <FindModal setModal={setFindModal}/>}
                </div>
            }
        </>
    )
};