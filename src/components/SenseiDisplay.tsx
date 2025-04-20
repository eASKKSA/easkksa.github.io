export default function SenseiDisplay({ name, sensei }: Readonly<{ name: string, sensei: any }>) {
    return (
        <div className="overflow-hidden justify-items-center gap-3 grid grid-cols-1 p-6 bg-[#300000] container rounded-2xl shadow-2xl">
            <img src={sensei.image} className="object-cover rounded-full h-24 w-24" alt="sensei"/>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <ul>
                {sensei.topics.map((topic: string) => (
                    <li key={topic} className="text-white text-sm shadow-2xl">{topic}</li>
                ))}
            </ul>
        </div>
    );
}