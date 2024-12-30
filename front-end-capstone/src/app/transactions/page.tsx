"use client";

import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";
import { getTransactions, sellStock } from "../../components/services/stockService";
import Home from "../home";
import { useState } from "react";

interface Transaction {
    company: string;
    sym: string;
    cost: number;
    quantity: number;
    sellPrice: number;
    evaluation: number;
}

interface Transactions {
    transactionList: Transaction[];
}

function App() {
    const { user } = useAuth();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [transactionList, setTransactionList] = useState<Transactions>({ transactionList: [] });


    async function toggleTransactions() {
        if (isExpanded) {
            setIsExpanded(false);
        } else {
            try {
                const response = await getTransactions(user?.email ?? "");
                const formattedResponse: Transactions = {
                    transactionList: response.transactionList, // map transactionList to transactions
                };
                setTransactionList(formattedResponse);
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
                        className="bg-green-800 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
                        onClick={toggleTransactions}
                        aria-label="show or hide your transactions toggle button"
                    >
                        {isExpanded ? "Hide Transactions" : "Show Transactions"}
                    </button>
                    {isExpanded && (
                        <div className="bg-purple-950 text-white mt-6 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                            <h2 className="text-xl font-semibold mb-4">Your past Transactions:</h2>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                {transactionList.transactionList.length <= 0 ?
                                    <div>
                                        No transactions to display at this time. 
                                    </div> :
                                    transactionList.transactionList.map((transaction, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b border-gray-700 py-2"
                                        >
                                            <div>
                                                <p className="font-semibold">{transaction.company} ({transaction.sym})</p>
                                                <p>Cost: ${transaction.cost.toFixed(2)} x {transaction.quantity}</p>
                                            </div>
                                            <div>
                                                <p>Sell Price: ${transaction.sellPrice.toFixed(2)}</p>
                                                <p>Profit/loss: ${transaction.evaluation.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
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