// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Background from "@/components/Background";
import { useState, useEffect } from "react";

export default function Layout() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Background />
            <Navbar />
            <main
                className={`container mx-auto px-4 pt-44 pb-12 transition-all space-y-24 duration-1000 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } dark:text-white text-slate-900`}
            >
                <Outlet />
            </main>
        </>
    );
}
