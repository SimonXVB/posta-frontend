import { Link } from "react-router";
import { FollowingPosts } from "../components/home components/homeFollowingPosts";
import { useFetchLogoutPosts } from "../hooks/home hooks/useFetchLogoutPosts";

export function LogoutHome() {
    const { posts, loading } = useFetchLogoutPosts();

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading &&
            <div className="bg-purple-200 h-screen">
                <div className="bg-purple-200 h-fit flex justify-center">
                    <div className="flex items-center flex-col font-sans bg-purple-200 max-w-455 w-full">
                        <div className="border-x-2 border-b-2 border-purple-400 h-fit mb-3 w-full">
                            <div className="flex flex-col flex-1">
                                <div className="bg-purple-400">
                                    <nav className="flex justify-between font-black text-2xl sticky py-3 top-0 bg-purple-400 px-5">
                                        <Link to={"/"}>
                                            Posta
                                        </Link>
                                        <Link to={"/login"} className="flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                                        </Link>
                                    </nav>
                                    <div>
                                        <FollowingPosts posts={posts}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}