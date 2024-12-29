import { useState } from "react"
import { LikedPosts } from "./profileLikedPosts";
import { LikedComments } from "./profieLikedComments";

export function Likes() {
    const [activeWindow, setActiveWindow] = useState("likedPosts");

    return (
        <>
            <div className="bg-purple-400 flex flex-col"> 
                <div className="flex justify-evenly text-lg font-semibold *:p-3 space hover:*:bg-purple-200 *:w-full">
                    <button onClick={() => setActiveWindow("likedPosts")} style={{backgroundColor: activeWindow === "likedPosts" && "rgb(233, 213, 255, 1)"}}>Liked Posts</button>
                    <button onClick={() => setActiveWindow("likedComments")} style={{backgroundColor: activeWindow === "likedComments" && "rgb(233, 213, 255, 1)"}}>LikedComments</button>
                </div>
                <div>
                    {activeWindow === "likedPosts" && <LikedPosts/>}
                    {activeWindow === "likedComments" && <LikedComments/>}
                </div>
            </div>
        </>
    )
};