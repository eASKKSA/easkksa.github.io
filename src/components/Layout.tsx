import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Background from "@/components/Background.tsx";
import { useState, useEffect } from "react";

export default function Layout() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Background />
            <Navbar />
            <div className={`transition-all justify-self-center duration-1000 container overflow-hidden ${isVisible ? 'opacity-0 blur-lg' : 'opacity-100 blur-none'}`}>
                <Outlet />
            </div>
        </>
    );
}
