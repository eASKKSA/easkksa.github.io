import background from '../assets/askksa-background-tiger.svg';
import logo from '/askksa_logo.svg';

export default function Home() {
    return (
        <div className="bg-neutral-500 relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <img
                src={background}
                alt="tiger"
                className="inset-0 w-screen min-w-full h-screen object-cover"
            />

            {/* Logo */}
            <img
                src={logo}
                alt="logo"
                className="fixed h-64 transform -translate-x-1/2 top-16 left-1/2 z-10"
            />

            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-20">
                <ul className="flex justify-center text-white text-lg font-semibold">
                    <li className="p-4 hover:text-gray-300">Home</li>
                    <li className="p-4 hover:text-gray-300">About</li>
                    <li className="p-4 hover:text-gray-300">Contact</li>
                </ul>
            </nav>
        </div>
    );
}