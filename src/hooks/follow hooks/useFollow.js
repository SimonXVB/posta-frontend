export function useFollow() {

    async function follow(currentUserId, followUserId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/follow`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": currentUserId,
                "followUserId": followUserId
            })
        });
        const json = await res.json();
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    async function unfollow(currentUserId, followUserId) {
        const res = await fetch(`http://localhost:8080/unfollow`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": currentUserId,
                "followUserId": followUserId
            })
        });
        const json = await res.json();
        
        if(json === "error") {
            alert("An Error Occurred")
        };

    };

    return { follow, unfollow }
};