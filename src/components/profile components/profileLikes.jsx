import { useState } from "react"
import { LikedPosts } from "./profileLikedPosts";
import { LikedComments } from "./profieLikedComments";

export function Likes() {
    const [activeWindow, setActiveWindow] = useState("likedPosts");

    return (
        <>
            <div className="bg-white flex flex-col"> 
                <div className="flex justify-evenly text-lg font-semibold *:p-3 space hover:*:bg-gray-300 *:w-full">
                    <button onClick={() => setActiveWindow("likedPosts")} style={{backgroundColor: activeWindow === "likedPosts" && "#ed1d23"}}>Liked Posts</button>
                    <button onClick={() => setActiveWindow("likedComments")} style={{backgroundColor: activeWindow === "likedComments" && "#3e47cc"}}>LikedComments</button>
                </div>
                <div>
                    {activeWindow === "likedPosts" && <LikedPosts/>}
                    {activeWindow === "likedComments" && <LikedComments/>}
                </div>
            </div>
        </>
    )
};