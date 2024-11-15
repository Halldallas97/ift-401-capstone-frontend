"use client"

import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";
import Home from "../home";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateWallet } from "@/components/services/stockService";




export default function Wallet() {
    const router = useRouter();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState<number | undefined>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function returnHome() {
        router.push("/");
    }

    return (
        <>
            <IsAuthorized>
                <div className="flex justify-center min-h-screen bg-transparent text-white">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-4 mb-4">Current Balance: ${user?.wallet}</h1>
                        <div className="p-6 bg-purple-950 rounded-lg shadow-md w-80 mx-auto">
                            <input
                                type="number"
                                placeholder="Monopoly Money Here"
                                className="text-black mt-2 p-1 rounded w-full"
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

                            {/* Container to group and format the buttons */}
                            <div className="mt-4 flex flex-col space-y-2">
                                <button
                                    className="p-2 rounded-md bg-green-500 hover:bg-green-800"
                                    onClick={() => updateWallet(quantity, user?.email, false)}
                                >
                                    Add to Wallet
                                </button>
                                <button
                                    className="p-2 rounded-md bg-yellow-500 hover:bg-green-800"
                                    onClick={() => updateWallet(quantity, user?.email, true)}
                                >
                                    Withdrawal
                                </button>
                                <button
                                    className="p-2 rounded-md bg-red-500 hover:bg-red-800"
                                    onClick={returnHome}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </IsAuthorized>
            <IsNotAuthorized>
                <Home />
            </IsNotAuthorized>
        </>
    );
}