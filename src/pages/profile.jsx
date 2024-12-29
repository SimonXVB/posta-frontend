import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchUser } from "../hooks/user hooks/useFetchUser";
import { EditProfileModal } from "../components/profile components/profileEditModal";
import { Followers } from "../components/profile components/profileFollowers";
import { Following } from "../components/profile components/profileFollowing";
import { Posts } from "../components/profile components/profilePosts";
import { Comments } from "../components/profile components/profileComments";
import { Likes } from "../components/profile components/profileLikes";
import { CurrentUserContext } from "../context/currenUserContext";
import { ProfileHeader } from "../components/profile components/profileHeader";
import { CreateButton } from "../components/individual components/createButton";
import { CreatePostModal } from "../components/profile components/createPostModal"
import { useFetchPosts } from "../hooks/post hooks/useFetchPosts";
import { ProfContext } from "../context/profileContext";

export function Profile() {
    const params = useParams();

    const [editModal, setEditModal] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [activeWindow, setActiveWindow] = useState("posts");

    const { currentUser, currentUserLoading } = useContext(CurrentUserContext);
    const { fetchUser, user, userLoading } = useFetchUser();
    const { fetchPosts, posts, postsLoading } = useFetchPosts();

    useEffect(() => {
        async function fetch() {
            await fetchUser(params.userId);
            await fetchPosts(params.userId);
            setActiveWindow("posts");   
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <>
            {!userLoading && !currentUserLoading && user &&
            <ProfContext value={{ user, userLoading, editModal, currentUser, posts, postsLoading, fetchPosts, fetchUser, setEditModal, setPostModal }}>
                <div className="flex items-center flex-col font-sans bg-purple-200">
                    <div className="border-x-2 border-purple-400 max-w-455 w-full min-h-screen mb-12">
                        <div className="bg-purple-400">
                            <ProfileHeader/>
                            <div className="flex overflow-scroll text-center text-lg font-semibold *:p-3 *:w-full hover:*:bg-purple-200">
                                <button onClick={() => setActiveWindow("posts")} style={{backgroundColor: activeWindow === "posts" && "rgb(233, 213, 255, 1)"}}>Posts</button>
                                <button onClick={() => setActiveWindow("followers")} style={{backgroundColor: activeWindow === "followers" && "rgb(233, 213, 255, 1)"}}>Followers</button>
                                <button onClick={() => setActiveWindow("following")} style={{backgroundColor: activeWindow === "following" && "rgb(233, 213, 255, 1)"}}>Following</button>
                                <button onClick={() => setActiveWindow("comments")} style={{backgroundColor: activeWindow === "comments" && "rgb(233, 213, 255, 1)"}}>Comments</button>
                                <button onClick={() => setActiveWindow("likes")} style={{backgroundColor: activeWindow === "likes" && "rgb(233, 213, 255, 1)"}}>Likes</button>
                            </div>
                        </div>
                        {activeWindow === "posts" && <Posts/>}
                        {activeWindow === "followers" && <Followers/>}
                        {activeWindow === "following" && <Following/>}
                        {activeWindow === "comments" && <Comments/>}
                        {activeWindow === "likes" && <Likes/>}
                    </div>
                    {currentUser && <CreateButton name={"Create Post"} onClick={() => setPostModal(true)}/>}
                </div>
                {editModal && <EditProfileModal/>}
                {postModal && <CreatePostModal/>}
            </ProfContext>
            }
        </>
    )
}