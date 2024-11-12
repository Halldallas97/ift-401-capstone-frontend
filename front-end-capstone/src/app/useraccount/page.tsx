"use client"

import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";
import { getStock } from "../../components/services/stockService"

import Home from "../home";
import { useEffect, useState } from "react";

interface Stock {
    company: string;
    sym: string;
    cost: number;
    quantity: number;
    volume: number;
}

interface Stocks {
    stocks: Stock[]; 
}

function App() {
    const { user } = useAuth();
    const [isexpanded, setIsExpanded] = useState<boolean>();
    const [response, setResponse] = useState<any>(null);
    const [stockList, setStockList] = useState<Stocks>({ stocks: [] });
   


    function expandButton() {
        getStock(user?.email); 

        setIsExpanded(true);
    }

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