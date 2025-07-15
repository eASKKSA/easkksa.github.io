import Image from "next/image";

const InstructorCard = ({ instructor }: { instructor: Instructor }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-primary hover:dark:bg-[#222]/80 border-gray-200/50 bg-white/60 hover:border-[#a4262c] hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      <Image
        src={instructor.image}
        alt={`Foto de ${instructor.name}`}
        width={128}
        height={128}
        className="rounded-full object-cover border-4 dark:border-primary/50 border-gray-300 mb-4"
        sizes="(max-width: 768px) 100vw, 128px"
      />
      <h3 className="text-xl font-bold mb-2 dark:text-white text-[#222]">
        {instructor.name}
      </h3>
      <p className="text-sm text-primary font-extrabold mb-2">
        {instructor.graduation}
      </p>
      <ul className="space-y-1 text-sm dark:text-gray-300 text-gray-600">
        {instructor.credentials.map((cred) => (
          <li key={cred}>✓ {cred}</li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorCard;
