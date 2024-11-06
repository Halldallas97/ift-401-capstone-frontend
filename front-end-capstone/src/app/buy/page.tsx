"use client";
import { useAuth } from "@/components/auth/authContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buyStock } from "../../components/helpers/RestHelper";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { useRouter } from "next/navigation";



export default function Buy() {
    const router = useRouter(); 
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const [quantity, setQuantity] = useState<number | undefined>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const symbol = searchParams.get("symbol");
    const name = searchParams.get("name");
    const cost = Number(searchParams.get("cost")); // Convert cost to a number

    async function returnHome(){
        router.push("/"); 
    }

    async function makePurchase() {
        if (quantity === undefined || quantity <= 0) {
            setErrorMessage("Please enter a valid quantity.");
            return;
        }

        const total = quantity * cost;

        if (user?.wallet !== undefined && total > user.wallet) {
            setErrorMessage("Insufficient balance.");
        } else {
            const newBalance = user?.wallet - total;
            setErrorMessage(null); 
            try {
                await buyStock(quantity, name, cost, total, symbol, user?.email, newBalance);
                router.push("/useraccount")
            } catch (error) {
                setErrorMessage("An error occurred while making the purchase.");
            }
        }
    }

    return (
        <>
            <IsAuthorized>

                <div className="flex justify-center min-h-screen bg-transparent text-white">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-4 mb-4">Available Balance: ${user?.wallet}</h1>
                        <div className="p-6 bg-purple-950 rounded-lg shadow-md w-80 mx-auto">
                            <h2 className="text-xl font-semibold mb-2">Stock Purchase Order Form</h2>
                            <p className="mb-1">Name: {name}</p>
                            <p className="mb-1">Symbol: {symbol}</p>
                            <p className="mb-1">Cost: ${cost}</p>
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="text-black mt-2 p-1 rounded"
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                            <button
                                className="p-2 m-2 rounded-md bg-green-500 hover:bg-green-800"
                                onClick={makePurchase}
                            >
                                Submit
                            </button>
                            <button
                                className="p-2 m-2 rounded-md bg-red-500 hover:bg-red-800"
                                onClick={returnHome}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            </IsAuthorized>

        </>

    );
}
