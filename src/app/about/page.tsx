import React from 'react';
import styles from './AboutUs.module.css';
import Image from "next/image";
import Navbar from '../../components/Navbar';

export default function AboutUs() {
  return (
    <div>
    <Navbar />
    <div className='p-3 rounded-lg'>
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className='bg-black/60 p-4 rounded-lg text-3xl font-semibold '>
          Qui sommes nous ?
        </div>
        <div className='bg-black/60 p-4 rounded-lg mt-6 '>
          <p className='text-md'>
            Notre institution est fondée sur 
            des connaissances et des pratiques acquises au Canada, 
            notamment au Collège Camosun et à l'Université de Victoria. 
            Nous sommes ravis de vous annoncer l'ouverture de 
            l'École de Technologie Nzirani de Bamako à partir 
            du 01 Août 2024. 
            Nous nous engageons à fournir une éducation de qualité
             pour préparer nos étudiants à exceller dans le domaine technologique.
              Rejoignez-nous pour une formation innovante et enrichissante.
          </p>
          <div className=' h-[100%] rounded flex items-center'>
                <Image
                  src="/img/LogoNziEdu.png"
                  alt="Centre de Formation Nzirani"
                  width={800}
                  height={800}
                  className="object-contain w-[100%] h-[120%]"
                />
          </div>
        </div>
        <div className='bg-black/60 p-4 rounded-lg mt-6 text-2xl font-semibold '>
          Notre Mission et Vision.
        </div>
        <div className='bg-black/60 p-4 rounded-lg mt-6 '>
          <div className='text-2xl'>Vision</div>
          <div className='mt-2 text-sm'>
            Être le leader en éducation technologique en Afrique de 
            l’Ouest, en formant des professionnels hautement qualifiés 
            et innovants qui contribueront au développement technologique 
            du Mali et de la région.
          </div>
          <div className='text-2xl mt-3'>Mission</div>
          <div className='mt-2 text-sm'>
            Notre mission est de fournir une éducation technologique 
            de haute qualité basée sur des pratiques et des connaissances 
            de pointe. Nous préparons nos étudiants à relever les défis 
            du marché global et à saisir les opportunités technologiques, 
            tout en favorisant l’innovation et la créativité.
          </div>
          <div className='mt-2 text-sm'>
            Nous collaborons avec des institutions internationales pour 
            maintenir un enseignement à la fine pointe de la technologie. 
            En formant des professionnels compétents, nous contribuons 
            au développement socio-économique du Mali et à la croissance 
            technologique de la région.
          </div>
        </div>
        <div className='flex justify-between mt-4'>
          <div className='w-[49%] flex flex-col h-[300px] justify-between'>
            <div className='h-[49%] bg-gray-200 rounded-lg items-center relative'>
              <Image
                  src="/img/aboutus2.png"
                  alt="Centre de Formation Nzirani"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
              />
            </div>
            <div className='h-[49%] bg-gray-200 rounded-lg items-center relative'>
              <Image
                  src="/img/aboutus1.png"
                  alt="Centre de Formation Nzirani"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
              />
            </div>
          </div>
          <div className='w-[49%] h-[max] bg-gray-100 rounded-lg relative'>
            <Image
                  src="/img/aboutus3.png"
                  alt="Centre de Formation Nzirani"
                  layout="fill"
                  objectFit="cover"
                  className="rounded "
              />
          </div>
        </div>
        <div className='bg-black/60 p-4 rounded-lg mt-6  text-2xl font-semibold '>
          Nos Partenaires
        </div>
        <div className='bg-black/60 p-4 rounded-lg mt-6 '> </div>
      </div>
    </div>
    </div>
    </div>
  );
}
