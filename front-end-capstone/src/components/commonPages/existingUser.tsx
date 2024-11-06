"use client"
import { useState } from "react";
import { checkuser } from "../helpers/RestHelper";
import { useAuth } from "../auth/authContext";

interface User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    wallet: number; 
}

export function ExistingUser() {
    const [email, setE] = useState<string>("");
    const [pWord, setP] = useState<string>("");
    const [completed, setIsComplete] = useState<boolean>(false);
    const { login } = useAuth();

    function closePopup() {
        setIsComplete(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const user = await checkuser(email, pWord);

            const useraccount: User = {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                wallet: user.wallet,
            };
            login("some-auth-token", useraccount); 
            window.location.reload();
        } catch (error) {
            console.error("Error checking user:", error);
        }
    }

    return (
        <>
            {!completed && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={closePopup}
                    ></div>
                    <div className="relative mx-auto rounded-md bg-transparent max-w-md z-50 p-6">
                        <div className="flex text-2xl text-center p-2">
                            User Details
                        </div>
                        <div>
                            <form className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-lg font-roboto font-semibold text-gray-700 mb-2"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="email"
                                        name="email"
                                        onChange={(e) => setE(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block text-lg font-roboto font-semibold text-gray-700 mb-2"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="password"
                                        name="password"
                                        onChange={(e) => setP(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                                        type="button"
                                        onClick={closePopup}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}