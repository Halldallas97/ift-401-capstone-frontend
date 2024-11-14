"use client";

import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";
import { getStock, sellStock } from "../../components/services/stockService";
import Home from "../home";
import { useState } from "react";

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
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [stockList, setStockList] = useState<Stocks>({ stocks: [] });

    async function togglePortfolio() {
        if (isExpanded) {
            setIsExpanded(false);
        } else {
            var email;
            try {
                const response = await getStock(user?.email);
                setStockList(response);
                setIsExpanded(true);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        }
    }

    return (
        <>
            <IsAuthorized>
                <div className="flex flex-col items-center  min-h-screen bg-transparent">
                    <div className="text-white text-3xl  m-6">
                        Welcome to your portfolio, {user?.userName}
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
                        onClick={togglePortfolio}
                    >
                        {isExpanded ? "Hide Portfolio" : "Show Portfolio"}
                    </button>
                    {isExpanded && (
                        <div className="bg-purple-950 text-white mt-6 p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Your Portfolio, click a stock to sell it:</h2>
                            <ul className="space-y-3">
                                {stockList.stocks.map((stock, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-700 hover:bg-gray-900 p-3 rounded-md shadow-sm flex justify-between"
                                    >
                                        <button className="hover:bg-gray-900" onClick={() => sellStock(stock, user?.email)}>
                                            <span>
                                                {stock.company} ({stock.sym})
                                            </span>
                                            <span>
                                                ${stock.cost} x {stock.quantity}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </IsAuthorized>
            <IsNotAuthorized>
                <Home />
            </IsNotAuthorized>

        </>
    );
}

export default App;