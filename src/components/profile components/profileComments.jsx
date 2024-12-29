import { ProfileContext } from "../../context/profileContext";
import { useContext, useEffect } from "react"
import { useFetchComments } from "../../hooks/comment hooks/useFetchComments";
import { Comment } from "../comment components/comment";
import { useDeleteComment } from "../../hooks/comment hooks/useDeleteComment";
import { useParams } from "react-router";

export function Comments() {
    const params = useParams();
    
    const { fetchComments, comments, commentsLoading } = useFetchComments();
    const { deleteComment } = useDeleteComment();
    const { currentUser } = useContext(ProfileContext);

    async function deleteFunc(postId, userId) {
        await deleteComment(postId, userId);
        await fetchComments(params.userId);
    };

    useEffect(() => {
        fetchComments(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!commentsLoading &&
            <div className="bg-purple-200 flex flex-col">
                {!comments && <div className="text-center py-5 text-3xl font-bold">User has no comments</div>}
                {comments && comments.map((comment) => (
                <div key={comment.id}>
                    <Comment currentUser={currentUser} post={comment} deleteComment={deleteFunc}/>
                </div>
                ))}
            </div>
        }
        </>
    )
};