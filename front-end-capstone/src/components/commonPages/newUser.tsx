import { useState } from "react";
import { createUser } from "../helpers/UserHelper";
import { useAuth } from "../auth/authContext";
import router from "next/router";

interface User{
    firstName: string; 
    lastName: string; 
    userName: string; 
}

export function NewUser() {
    const [email, setE] = useState<string>("");
    const [pWord, setP] = useState<string>("");
    const [lName, setlName] = useState<string>("");
    const [fName, setfName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [completed, setIsComplete] = useState<boolean>(false);
    const { login } = useAuth();

    function closePopup() {
        setIsComplete(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const user: User = {
            firstName: fName,
            lastName: lName,
            userName: userName,
        };
        try {
            await createUser(email, userName, fName, lName, pWord);
            
            login("some-auth-token" , user);
            window.location.reload();
        } catch (error) {
            console.error("Error creating user:", error);
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
                            <form
                                className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
                                onSubmit={handleSubmit}
                            >
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
                                        htmlFor="userName"
                                        className="block text-lg font-roboto font-semibold text-gray-700 mb-2"
                                    >
                                        Username:
                                    </label>
                                    <input
                                        type="userName"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="userName"
                                        name="userName"
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="firstname"
                                        className="block text-lg font-roboto font-semibold text-gray-700 mb-2"
                                    >
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="fName"
                                        name="fName"
                                        onChange={(e) => setfName(e.target.value)}
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="lastname"
                                        className="block text-lg font-roboto font-semibold text-gray-700 mb-2"
                                    >
                                        Last name:
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="lName"
                                        name="lName"
                                        onChange={(e) => setlName(e.target.value)}
                                        placeholder="Last name"
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
    );
}
