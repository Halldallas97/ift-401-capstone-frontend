"use client";
import { useAuth } from "../components/auth/authContext";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { NewUser } from "../components/commonPages/newUser"
import { ExistingUser } from "../components/commonPages/existingUser"
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import { IsNotAuthorized } from "@/components/auth/IsNotAuthorized";


export default function Home() {

    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isNewUserPopupOpen, setIsnewUserPopupOpen] = useState<boolean>(false);
    const [isCurrentUserPopupOpen, setIsCurrentUserPopupOpen] = useState<boolean>(false);
    const { user } = useAuth();

    function setNewUser() {
        setIsnewUserPopupOpen(true);
    }

    function setCurrentUser() {
        setIsCurrentUserPopupOpen(true);
    }

    return (
        <div className="text-center">
            <IsAuthorized>
                <div className="p-4">

                    <TypeAnimation
                        className="text-white text-4xl font-roboto italic bold"
                        sequence={[
                            `Welcome to StonkTrader.io ${user?.firstName},`,
                            500,
                            `Welcome to StonkTrader.io ${user?.firstName}, where you buy at the dip and sell at the peak.`,
                            () => {
                                setIsComplete(true);
                            },
                        ]}
                    />
                </div>


            </IsAuthorized>
            <IsNotAuthorized>
                <div className="flex flex-col justify-center items-center min-h-screen">
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
                    {isComplete && (
                        <div className="flex flex-row row-span-2 mt-4">
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
            </IsNotAuthorized>
        </div>
    );
}
