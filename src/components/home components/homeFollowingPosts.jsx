import { Post } from "../post components/post";
import { useContext } from "react"
import { useDeletePost } from "../../hooks/post hooks/useDeletePost";
import { CurrentUserContext } from "../../context/currenUserContext";

export function FollowingPosts({ posts }) {
    const { deletePost } = useDeletePost();
    const { currentUser, loading } = useContext(CurrentUserContext)

    return (
        <>
        {!loading &&
            <div className="bg-purple-200 flex flex-col">
                {!posts && <div className="text-center py-5 text-3xl font-bold">Nothing to see here</div>}
                {posts && posts.map((post) => (
                    <div key={post.id}>
                        <Post currentUser={currentUser} post={post} deletePost={deletePost}/>
                    </div>
                ))}
            </div>
        }
        </>
    )
};