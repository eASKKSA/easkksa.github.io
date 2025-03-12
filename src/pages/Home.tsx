import QuemSomos from "@/pages/WhoWeAre.tsx";

export default function Home() {
    return (
        <div className="justify-items-center gap-64 grid grid-cols-1 mt-56">
            <QuemSomos />
            <div className="overflow-hidden h-96 bg-black w-screen">
                Hello World
            </div>
            <div className="overflow-hidden h-96 bg-black w-screen">
                Hello World
            </div>
            <div className="overflow-hidden h-96 bg-black w-screen">
                Hello World
            </div>

        </div>
    );
}