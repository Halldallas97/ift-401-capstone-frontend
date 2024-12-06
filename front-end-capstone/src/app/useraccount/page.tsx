"use client";

import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";
import { getStock, sellStock } from "../../components/services/stockService";
import Home from "../home";
import { useState } from "react";
import { dateCreator } from "@/components/helpers/redirect";

interface Stock {
    company: string;
    sym: string;
    cost: number;
    quantity: number;
    volume: number;
}
interface CurrentStockPrice {
    sym: string;
    cost: number;
}

interface CurrentStock {
    currentStocks: CurrentStock[];
}

interface Stocks {
    stocks: Stock[];
}

function App() {
    const { user } = useAuth();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [stockList, setStockList] = useState<Stocks>({ stocks: [] });
    const [currentStockPriceList, setCurrentStockPriceList] = useState<CurrentStock>({ currentStocks: [] });


    async function togglePortfolio() {
        const formattedDate = dateCreator(true);
        const formattedYesterday = dateCreator(false);

        if (isExpanded) {
            setIsExpanded(false);
        } else {
            try {
                const response = await getStock(user?.email);
                setStockList(response);

                const updatedStockPrices: CurrentStockPrice[] = await Promise.all(
                    response.stocks.map(async (stock) => {
                        const stockResponse = await fetch(
                            `https://api.polygon.io/v2/aggs/ticker/${stock.sym}/range/1/day/${formattedYesterday}/${formattedDate}?adjusted=true&sort=asc&apiKey=0e7hWppHXfdD0zxhLTAJ45Uy_fpVeX1_`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            }
                        );
                        const newStockData = await stockResponse.json();
                        const cost = newStockData.results?.[0]?.c || 0;

                        console.log(newStockData);
                        console.log(cost);

                        return { sym: stock.sym, cost };
                    })
                );

                setCurrentStockPriceList({ currentStocks: updatedStockPrices });
                console.log("current list: \n", updatedStockPrices);

                setIsExpanded(true);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        }
    }


    return (
        <>
            <IsAuthorized>
                <div className="flex flex-col items-center min-h-screen bg-transparent">
                    <div className="text-white text-3xl m-6">
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
                                {stockList.stocks.map((stock, index) => {
                                    const currentStock = currentStockPriceList.currentStocks.find(
                                        (current) => current.sym === stock.sym
                                    );
                                    const currentPrice = currentStock?.cost ?? 0;

                                    const priceDifferenceStyle =
                                        currentPrice > stock.cost ? "text-green-500" : "text-red-500";

                                    return (
                                        <li
                                            key={index}
                                            className="bg-gray-700 hover:bg-gray-900 p-3 rounded-md shadow-sm flex justify-between items-center"
                                        >
                                            <button
                                                className="hover:bg-gray-900 flex-1 text-left"
                                                onClick={() => sellStock(stock, user?.email)}
                                            >
                                                <div>
                                                    <span className="font-semibold">
                                                        {stock.company} ({stock.sym})
                                                    </span>
                                                </div>
                                                <div>
                                                    Original: ${stock.cost} x {stock.quantity}
                                                </div>
                                            </button>
                                            <span className={`font-bold ${priceDifferenceStyle}`}>
                                                Current: ${currentPrice.toFixed(2)}
                                            </span>
                                        </li>
                                    );
                                })}
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