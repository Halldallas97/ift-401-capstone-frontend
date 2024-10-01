"use client"
import { useAuth } from "@/components/auth/authContext";
import { IsAuthorized } from "@/components/auth/IsAuthorized";
import Link from "next/link";


export default function Header() {
    const { logout, user } = useAuth();

    function logoutUser() {
        try {
            logout();
            window.location.reload();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
    return (
        <div className="bg-purple-950 w-[100vw] p-4 flex flex-col justify-between h-auto">
            <div className="flex gap-4 justify-center items-center text-white mt-auto flex-row">
                <IsAuthorized>
                    <button className="text-white text-lg hover:text-gray-400" onClick={logoutUser}>
                        Logout
                    </button>
                    <div className="flex items-center hover:text-gray-400">
                        <Link href="/">Home</Link>
                    </div>
                    <div className="flex items-center hover:text-gray-400">
                        <Link href="/useraccount">Dashboard</Link>
                    </div>
                    <div className="flex items-center hover:text-gray-400">
                        Wallet ${user?.wallet}

                    </div>
                </IsAuthorized>

            </div>
        </div>


    );
}