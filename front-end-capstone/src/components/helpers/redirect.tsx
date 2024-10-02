import { NextRouter } from "next/router";
import { useEffect } from "react";

interface Redirect {
    router: NextRouter;
}

export default function RedirectToHome({ router }: Redirect){
    useEffect(() => {
        router.push("/");
    }, [router]);

    return null; 
}