import { FollowingPosts } from "../components/home components/homeFollowingPosts";
import { useFetchLogoutPosts } from "../hooks/home hooks/useFetchLogoutPosts";

export function LogoutHome() {
    const { posts, loading } = useFetchLogoutPosts();

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading &&
                <div className="flex justify-center">
                    <div className="max-w-455 w-full">
                        <div className="border-x-4 border-white min-h-screen w-full bg-black">
                            <FollowingPosts posts={posts}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}