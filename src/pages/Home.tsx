// src/pages/Home.tsx
import React from 'react';
import { Seo } from '@/components/SEO';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const features = [
    {
        id: 'tradition',
        title: 'Tradição Milenar',
        description: 'Karate Shotokan autêntico com linhagem direta do Japão e técnicas tradicionais preservadas.',
        icon: '🥋',
    },
    {
        id: 'instructors',
        title: 'Mestres Qualificados',
        description: 'Instrutores com certificação internacional SKI e décadas de experiência.',
        icon: '👨‍🏫',
    },
    {
        id: 'community',
        title: 'Todas as Idades',
        description: 'Turmas especializadas para crianças, jovens e adultos com metodologia adaptada.',
        icon: '👥',
    },
];

const schedules = [
    { day: 'Segunda a Quinta', time: '18h30 - 20h00', level: 'Adultos' },
    { day: 'Terça e Quinta', time: '17h00 - 18h00', level: 'Juvenil' },
    { day: 'Sábado', time: '9h00 - 11h00', level: 'Crianças' },
];

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                                          children,
                                                                                          className = ''
                                                                                      }) => {
    const { ref, hasIntersected } = useIntersectionObserver({
        threshold: 0.2,
        triggerOnce: true,
    });

    return (
        <section
            ref={ref}
            className={`transition-all duration-700 ${
                hasIntersected
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-8'
            } ${className}`}
        >
            {children}
        </section>
    );
};

const Home: React.FC = () => {

    return (
        <>
            <Seo
                title="Academia de Karate Shotokan - Tradição e Excelência"
                description="ASKKSA oferece ensino tradicional de Karate Shotokan com instrutores qualificados. Aulas para todas as idades. Aula experimental gratuita. Venha nos conhecer!"
                keywords={['karate', 'shotokan', 'arte marcial', 'academia', 'treino', 'disciplina', 'autodefesa']}
            />

            <main id="main-content" className="space-y-24 py-8">
                {/* Hero Section */}
                <AnimatedSection>
                    <div className={`relative text-center rounded-3xl p-12 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50`}>
                        <div className="relative z-10">
                            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display dark:text-white text-[#222]`}>
                                ASKKSA
                                <span className="block text-[#a4262c] text-3xl md:text-4xl lg:text-5xl mt-2">
                  Karate Club
                </span>
                            </h1>

                            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed dark:text-gray-200 text-gray-700`}>
                                Tradição, disciplina e excelência no Karate Shotokan.
                                Descubra a força interior através da arte marcial milenar.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="bg-[#a4262c] hover:bg-[#8b1e23] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-[#a4262c]/50 shadow-lg">
                                    Aula Experimental Gratuita
                                </button>
                                <button className={`border-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:ring-4 shadow-lg dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#222] dark:focus:ring-white/50 border-[#222] text-[#222] hover:bg-[#222] hover:text-white focus:ring-[#222]/50`}>
                                    Saiba Mais
                                </button>
                            </div>
                        </div>

                        {/* Decorative elements with your colors */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-[#a4262c]/20 rounded-full -translate-x-16 -translate-y-16" />
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a4262c]/10 rounded-full translate-x-24 translate-y-24" />
                    </div>
                </AnimatedSection>

                {/* Features Section */}
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-bold mb-6 font-display dark:text-white text-[#222]`}>
                            Por que escolher a ASKKSA?
                        </h2>
                        <p className={`text-xl max-w-3xl mx-auto dark:text-gray-300 text-gray-600`}>
                            Mais de 30 anos formando karatekas com os mais altos padrões de qualidade
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={feature.id} feature={feature} index={index} />
                        ))}
                    </div>
                </AnimatedSection>

                {/* Schedule Section with your primary color */}
                <AnimatedSection>
                    <div className="bg-gradient-to-br from-[#a4262c] to-[#741b1f] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
                                Horários de Treino
                            </h2>
                            <p className="text-xl opacity-90">
                                Encontre o horário perfeito para sua jornada no Karate
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {schedules.map((schedule, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/10"
                                >
                                    <h3 className="text-xl font-bold mb-2">{schedule.level}</h3>
                                    <p className="text-lg mb-1">{schedule.day}</p>
                                    <p className="text-2xl font-bold text-yellow-300">{schedule.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Contact Section */}
                <AnimatedSection>
                    <div className={`rounded-3xl p-8 md:p-12 backdrop-blur-sm border shadow-xl dark:bg-[#2a2a2a]/60 dark:border-gray-700/50 bg-white/60 border-gray-200/50`}>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className={`text-3xl md:text-4xl font-bold mb-6 font-display dark:text-white text-[#222]`}>
                                    Visite nosso Dojo
                                </h2>
                                <p className={`text-xl mb-8 dark:text-gray-300 text-gray-600`}>
                                    Venha conhecer nossa estrutura e metodologia.
                                    A primeira aula é sempre gratuita!
                                </p>

                                <div className="space-y-6">
                                    <ContactItem
                                        icon="📍"
                                        title="Localização"
                                        content="Rua Example, 123 - Centro"
                                    />
                                    <ContactItem
                                        icon="📞"
                                        title="Telefone"
                                        content="(11) 99999-9999"
                                    />
                                    <ContactItem
                                        icon="✉️"
                                        title="Email"
                                        content="contato@askksa.com"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <OptimizedImage
                                    src="/assets/dojo-interior.jpg"
                                    alt="Interior do dojo ASKKSA"
                                    className="rounded-xl h-80 w-full shadow-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
        </>
    );
};

const FeatureCard: React.FC<{ feature: typeof features[0]; index: number }> = ({
                                                                                   feature,
                                                                                   index
                                                                               }) => {
    const { ref, hasIntersected } = useIntersectionObserver({
        threshold: 0.3,
        triggerOnce: true,
    });

    return (
        <div
            ref={ref}
            className={`rounded-xl p-8 text-center transition-all duration-500 transform border shadow-lg ${
                hasIntersected
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
            } dark:bg-[#2a2a2a]/60 dark:backdrop-blur-sm dark:hover:bg-[#363636]/60 dark:border-gray-700/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/50`}
            style={{ transitionDelay: `${index * 200}ms` }}
        >
            <div className="text-6xl mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-[#a4262c] mb-4">{feature.title}</h3>
            <p className={`leading-relaxed dark:text-gray-300 text-gray-600`}>{feature.description}</p>
        </div>
    );
};

const ContactItem: React.FC<{ icon: string; title: string; content: string }> = ({
                                                                                     icon,
                                                                                     title,
                                                                                     content,
                                                                                 }) => {

    return (
        <div className="flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            <div>
                <h4 className={`font-bold text-lg dark:text-white text-[#222]`}>{title}</h4>
                <p className={`dark:text-gray-300 text-gray-600`}>{content}</p>
            </div>
        </div>
    );
};

export default Home