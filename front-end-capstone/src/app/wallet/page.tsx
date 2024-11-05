"use client"

import { useAuth } from "@/components/auth/authContext";



export default function Wallet() {
    const { user } = useAuth();
    
    // function for wallet 
    //
    
    return (
        <div className="text-white">
            <h1>
                hello world {user?.wallet}
            </h1>
        </div>
    );
}