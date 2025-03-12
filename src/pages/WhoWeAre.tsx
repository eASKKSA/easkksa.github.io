import SenseiDisplay from "@/components/SenseiDisplay.tsx";
import jorgeFreitas from '@/assets/senseis/jorge_freitas.png';
import titoVelosa from '@/assets/senseis/tito_velosa.png';
import marisaGomes from '@/assets/senseis/marisa_gomes.png';
import rafaelJardim from '@/assets/senseis/rafael_jardim.png';

export default function WhoWeAre() {

    const senseis = {
        "Jorge Freitas": {
            "image": jorgeFreitas,
            "topics": [
                "Graduação de 6º DAN (6º nível de cinto negro)",
                "Iniciou a  prática da modalidade no Ano de 1987",
                "Graduado pela SKIF Canada",
                "Graduado pela SKIF – Shotokan Karate Internacional Federation",
                "Treinador de Karate Grau III – Federação Nacional de Karate – Portugal",
                "Árbitro B – Federação Nacional de Karate – Portugal"
            ]
        },
        "Tito Velosa": {
            "image": titoVelosa,
            "topics": [
                "Graduação de 4º DAN (4º nível de cinto negro)",
                "Iniciou a prática da modalidade no Ano de 1995",
                "Graduado pela SKIF Canada",
                "Graduado pela SKIF – Shotokan Karate Internacional Federation",
                "Treinador de Karate Grau II – Federação Nacional de Karate – Portugal",
                "Árbitro B – Federação Nacional de Karate – Portugal"
            ]
        },
        "Marisa Gomes": {
            "image": marisaGomes,
            "topics": [
                "Graduação de 4º DAN (4º nível de cinto negro)",
                "15 anos de prática da modalidade",
                "Graduado pela SKIF Canada",
                "Graduado pela SKIF – Shotokan Karate Internacional Federation",
                "Treinador de Karate Grau II – Federação Nacional de Karate – Portugal",
                "Juiz de Karate – Federação Nacional de Karate Portugal"
            ]
        },
        "Rafael Jardim": {
            "image": rafaelJardim,
            "topics": [
                "Graduação de 4º DAN (4º nível de cinto negro)",
                "Iniciou a  prática da modalidade no Ano de 1992",
                "Graduado pela SKIF Canada",
                "Graduado pela ASKKM",
                "Treinador de Karate Grau I – Federação Nacional de Karate – Portugal",
                "Árbitro B – Federação Nacional de Karate – Portugal"
            ]
        }
    }

    return (
        <>
            <div
                className="overflow-hidden p-6 bg-[#200000] gap-3 container rounded-2xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
                {Object.entries(senseis).map(([name, sensei]) => {
                    return <SenseiDisplay key={name} name={name} sensei={sensei}/>;
                })}
            </div>
        </>
    );
}