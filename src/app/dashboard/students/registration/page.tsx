'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import Image from 'next/image';

const StudentRegistration = () => {
  const router = useRouter();

  const navigateToRegistration = () => {
    router.push('/dashboard/students/registration/infos');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black/10 w-[100%] h-[100%] flex flex-col items-center justify-center">
      <div className="hero-section relative w-full h-[80vh] mb-8">
        <Image
          src="/img/Nzirani EDucation2.png"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col
         items-center justify-center text-white text-center rounded-xl">
          <h1 className="text-5xl font-bold mb-4 px-4">Bienvenue à l'Inscription des Étudiants</h1>
          <p className="text-xl mb-8">Rejoignez-nous et commencez votre parcours dès aujourd'hui !</p>
          <Button type="primary" size="large" 
          onClick={navigateToRegistration} className="px-8 py-4 text-xl font-semibold">
            Commencer l'Inscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;