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
            <div className="text-white text-2xl font-bold text-center mb-4" aria-label="Company name">
            <Link href="/">StonkTrader.io</Link>
            </div>

            <div className="flex gap-4 justify-center items-center text-white mt-auto flex-row">
                <IsAuthorized>
                    <button className="text-white text-lg hover:text-gray-400" onClick={logoutUser}
                    aria-label="button to logout user">
                        Logout
                    </button>
                    
                    <div className="flex items-center hover:text-gray-400" aria-label="view the current user portfolio">
                        <Link href="/useraccount">Portfolio</Link>
                    </div>
                    <div className="flex items-center hover:text-gray-400" aria-label="view the current user portfolio">
                        <Link href="/transactions">Transactions</Link>
                    </div>
                    <div className="flex items-center hover:text-gray-400" aria-label="Add or withdrawl from wallet">
                        <Link href="/wallet">Wallet ${user?.wallet}</Link>
                    </div>
                </IsAuthorized>
            </div>
        </div>


    );
}