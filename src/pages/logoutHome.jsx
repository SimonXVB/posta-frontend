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