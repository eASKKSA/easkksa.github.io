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
            <div className={`transition-all ease-in duration-800 overflow-hidden ${isVisible ? 'mt-[100vh]' : 'mt-0'} z-0`}>
                <Outlet />
            </div>
        </>
    );
}
