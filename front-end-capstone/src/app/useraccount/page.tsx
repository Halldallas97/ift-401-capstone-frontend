"use client"

import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";

import Home from "../home";
import { useEffect, useState } from "react";

const path = "http://localhost:8080/api/server"

// async function getPortfolio() {
//     try {
//         const data = await fetch(path, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return await data.json()
//     } catch (err) {
//         console.error(`There was an error fetching data: ${err}`);
//     }
// }

function App() {
    const { user } = useAuth();
    const [isexpanded, setIsExpanded] = useState<boolean>();
    const [response, setResponse] = useState<any>(null);


    function expandButton() {
        setIsExpanded(true);
    }

    // async function fetchPortfolio() {
    //     const responseData = await getPortfolio();
    //     setResponse(responseData)
    // }

    // useEffect(() => {
    //     fetchPortfolio()
    // }, [])



    // if (!response) return <div>Loading...</div>

    // if (response.error) {
    //     return <div>There was an error</div>
    // }

    return (
        <><IsAuthorized>
            <div className="grid grid-cols-1 grid-rows-2 justify-center text-center p-4">
                <div className="text-white text-2xl">User: {user?.userName}</div>
                <div>
                    <button className="text-white w-3/4 bg-transparent border p-2 rounded-md" onClick={expandButton}>
                        Show Portfolio
                    </button>
                    {isexpanded && (
                        <div className="text-white"> some portfolio data...</div>
                    )}
                </div>


            </div>
        </IsAuthorized>
            <IsNotAuthorized>
                <Home />
            </IsNotAuthorized>

        </>
    );
}

export default App;