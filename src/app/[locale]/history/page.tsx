import { Metadata } from "next";
import Image from "next/image";

import { PageAnimationWrapper } from "@/components/page-animation-wrapper";
import historyBannerUrl from "@/assets/masters-of-karate.jpg";
import Article from "@/components/article";

export const metadata: Metadata = {
  title: "História do Karate | ASKKSA",
  description:
    "Descubra a rica história do Karate-do, desde as suas origens em Okinawa até à sua modernização e popularização como uma arte marcial japonesa de renome mundial.",
  keywords: [
    "História do Karate",
    "Karate-do",
    "Budo",
    "Gichin Funakoshi",
    "Shotokan",
    "Kihon",
    "Kumite",
    "Kata",
    "Okinawa",
    "ASKKSA",
  ],
};

// --- MAIN PAGE COMPONENT ---

export default async function HistoryPage() {
  return (
    <PageAnimationWrapper>
      <Article className="relative text-justify rounded-3xl p-12 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-center">História do Karate-do | Budo Okinawa</h1>

          {/* Banner Image and Introduction - Side by Side */}
          <div className="mb-12 flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Introduction Text - Left Side */}
            <div className="flex-1 lg:pr-4">
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                <strong>Karate</strong> ou <strong>karate-do</strong> é uma
                forma de budo (caminho do guerreiro). Uma arte marcial japonesa
                que tem a sua origem em Okinawa e foi introduzida nas principais
                ilhas do arquipélago japonês em 1922. O Karate enfatiza as
                técnicas de ataque (como socos e pontapés) em detrimento das
                técnicas de luta corpo-a-corpo.
              </p>
            </div>

            {/* Banner Image - Right Side */}
            <div className="flex-shrink-0 mt-6 lg:mt-0">
              <div className="h-52 w-96 relative mx-auto lg:mx-0">
                <Image
                  src={historyBannerUrl}
                  alt="Mestres Fundadores do Karate"
                  layout="fill"
                  className="rounded-xl object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="mt-10 mb-12 p-6 bg-primary/20 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Os Três Pilares da Prática
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              A prática do Karate pode ser dividida em três partes principais:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li>
                <strong>Kihon (基本):</strong> O estudo e a repetição dos
                movimentos básicos, a fundação de toda a técnica.
              </li>
              <li>
                <strong>Kumite (組手):</strong> Significa "luta" e é a aplicação
                prática das técnicas com um parceiro, podendo ser executada de
                forma definida ou livre (randori).
              </li>
              <li>
                <strong>Kata (型):</strong> Significa "forma" e é uma sequência
                de movimentos que simula uma luta contra inimigos imaginários,
                essencial para o desenvolvimento da técnica e do espírito.
              </li>
            </ul>
          </div>

          {/* Origins */}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Origens e Evolução
          </h2>
          <div className="space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            <p>
              Originalmente, a palavra "karate" era escrita com ideogramas que
              significavam "mão chinesa" (唐手), refletindo a influência da
              dinastia Tang. Hoje, o significado mais comum é "mão vazia"
              (空手), e <strong>Karate-do</strong> traduz-se como "o caminho da
              mão vazia". Acredita-se que a arte seja uma fusão de técnicas de
              luta chinesas, trazidas para Okinawa por mercadores, com a arte de
              luta nativa de Okinawa, conhecida como <strong>Te</strong> (mão).
            </p>
            <p>
              Em 1820, o mestre <strong>Sokon Matsumura</strong> fundiu os
              estilos locais (Shuri-te, Naha-te e Tomari-te), mas foram os seus
              próprios estudantes que, ao adicionar e subtrair técnicas, criaram
              novas variantes. Foi <strong>Gichin Funakoshi</strong>, um
              estudante de um dos discípulos de Matsumura, que introduziu e
              popularizou o Karate nas ilhas principais do Japão.
            </p>
          </div>

          {/* Modernization */}
          <h2 className="mt-12 text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            A Modernização no Japão
          </h2>
          <div className="space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            <p>
              Funakoshi foi o responsável pela mudança na escrita do nome para
              "mão vazia", uma forma de integrar a arte na cultura do budo
              japonês e distanciar-se das suas origens estrangeiras durante um
              período de forte nacionalismo. O Karate foi popularizado e
              introduzido nas escolas secundárias antes da Segunda Guerra
              Mundial.
            </p>
            <p>
              Como muitas artes marciais japonesas, o Karate fez a sua transição
              para o <strong>Karate-do</strong> no início do século XX. O "do"
              (caminho) imbui a prática com elementos do Zen Budismo, sendo por
              vezes chamado de "Zen em movimento". A modernização também incluiu
              a adoção do uniforme branco (<strong>keikogi</strong>) e das
              faixas coloridas para indicar a graduação, ambos popularizados por
              Jigoro Kano, o fundador do Judo.
            </p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-32 h-32 bg-[#a4262c]/20 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a4262c]/10 rounded-full translate-x-24 translate-y-24" />
      </Article>
    </PageAnimationWrapper>
  );
}
