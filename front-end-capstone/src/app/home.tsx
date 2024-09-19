"use client";
import { useAuth } from "../components/auth/authContext";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { NewUser } from "../components/commonPages/newUser"
import { ExistingUser } from "../components/commonPages/existingUser"

export default function Home() {
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isNewUserPopupOpen, setIsnewUserPopupOpen] = useState<boolean>(false);
    const [isCurrentUserPopupOpen, setIsCurrentUserPopupOpen] = useState<boolean>(false);
    const { logout, isAuthenticated } = useAuth();

    function setNewUser() {
        setIsnewUserPopupOpen(true);
    }

    function setCurrentUser() {
        setIsCurrentUserPopupOpen(true);
    }

    function closePopup() {
        setIsCurrentUserPopupOpen(false);
        setIsnewUserPopupOpen(false);
    }

    function logoutUser() {
        try {
            logout();
            window.location.reload(); 
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <TypeAnimation
                    className="text-white text-4xl font-roboto italic bold"
                    sequence={[
                        "Welcome to StonkTrader.io ",
                        500,
                        "Welcome to StonkTrader.io where you buy at the dip and sell at the peak.",
                        () => {
                            setIsComplete(true);
                        },
                    ]}
                />
                {isAuthenticated && (
                    <div className="flex justify-center">
                        <button className="bg-black text-white text-lg hover:bg-gray-800 rounded-md p-1 m-2" onClick={logoutUser}> logout </button>
                    </div>
                )}
                {isComplete && !isAuthenticated && (
                    <div>
                        <button
                            className="bg-black text-white text-lg hover:bg-gray-800 rounded-md p-1 m-2"
                            onClick={setCurrentUser}
                        >
                            Login
                        </button>
                        <button
                            className="bg-black text-white text-lg hover:bg-gray-800 rounded-md p-1 m-2"
                            onClick={setNewUser}
                        >
                            Create Account
                        </button>
                        {isCurrentUserPopupOpen && (
                            <ExistingUser></ExistingUser>
                        )}
                        {isNewUserPopupOpen && (
                            <NewUser></NewUser>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
