import {useEffect, useState} from "react";
import background from "@/assets/askksa-background-tiger.svg";
import backgroundMobile from "@/assets/askksa-background-tiger-mobile.svg";

export default function Background() {
    const [bgImage, setBgImage] = useState(
        window.innerWidth > 1000 ? background : backgroundMobile
    );

    useEffect(() => {
        const handleResize = () => {
            setBgImage(window.innerWidth > 1000 ? background : backgroundMobile);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="bg-neutral-400 min-h-screen overflow-hidden fixed top-0 -z-20">
            <img
                src={bgImage}
                alt="tiger"
                className="inset-0 w-screen min-w-full h-screen object-cover -z-20"
            />
        </div>
    );
}