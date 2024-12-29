import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useFetchPost } from "../hooks/post hooks/useFetchPost"
import { CurrentPostPost } from "../components/current post components/currentPostPost";
import { CurrentUserContext } from "../context/currenUserContext";
import { CurrentPostComments } from "../components/current post components/currentPostComments";
import { useDeleteComment } from "../hooks/comment hooks/useDeleteComment";
import { useCreateComment } from "../hooks/comment hooks/useCreateComment";
import { Error } from "../components/individual components/error";
import { useLogin } from "../hooks/user hooks/useLogin";

export function CurrentPost() {
    const params = useParams();

    const [commentContent, setCommentContent] = useState("");

    const { fetchPost, post, postLoading } = useFetchPost();
    const { currentUser } = useContext(CurrentUserContext);
    const { deleteComment } = useDeleteComment();
    const { createComment, createCommentError, setCreateCommentError } = useCreateComment();
    const { logout } = useLogin();

    async function create(e, userId, content, postId) {
        await createComment(e, userId, content, postId);
        fetchPost(postId);
        setCommentContent("");
    };

    async function delComment(postId, userId) {
        await deleteComment(postId, userId);
        fetchPost(params.postId);  
    };

    useEffect(() => {
        fetchPost(params.postId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setCreateCommentError(null);
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createCommentError]);



    return (
        <>
        {!postLoading &&
            <div className="flex justify-center">
                <div className="font-sans bg-purple-200 max-w-455 w-full">
                    <div className="border-x-2 border-purple-400 min-h-screen w-full">
                        <nav className="flex justify-between font-black text-2xl sticky py-3 top-0 bg-purple-400 px-5">
                            {currentUser &&
                            <Link to={`/user/${currentUser.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                            </Link>
                            }
                            <Link to={"/"}>
                                Posta
                            </Link>
                            <button onClick={() => logout()}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                            </button>
                        </nav>
                        <CurrentPostPost currentUser={currentUser} post={post}/>
                        <div className="flex justify-center flex-col">
                            {currentUser &&
                            <>
                                <form onSubmit={e => create(e, currentUser.id, commentContent, post.id)} className="flex flex-col">
                                    <input className="mx-2 text-center outline-none h-8 mt-2" placeholder="New Comment" onChange={e => setCommentContent(e.target.value)} value={commentContent}/>
                                    <button className="py-2 mx-2 hover:bg-purple-400" type="submit">Post</button>
                                </form>
                                {createCommentError === "empty" && <Error error={"Comment Can Not Be Empty"}/>}
                                {createCommentError === "error" && <Error error={"An Error Occurred"}/>}
                            </>
                            }
                            <p className="text-center text-xl font-bold py-2 border-b-2 border-purple-400">Comments</p>
                        </div>
                        {post.comments.map((comment) => (
                            <div key={comment.id}>
                                <CurrentPostComments currentUser={currentUser} post={comment} deleteComment={delComment}/>
                            </div>
                        ))}
                        {post.comments.length === 0 && <div className="text-center text-2xl font-bold m-5">Nothing to see here. Yet.</div>}
                    </div>
                </div>
            </div>
        }
        </>
    )
};