import { NextRouter } from "next/router";
import { useEffect } from "react";

interface Redirect {
    router: NextRouter;
}

export function dateCreator(dateToday: boolean){
    const today = new Date();
    if(dateToday){
        return today.toISOString().split('T')[0];
    }
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

export default function RedirectToHome({ router }: Redirect){
    useEffect(() => {
        router.push("/");
    }, [router]);

    return null; 
}