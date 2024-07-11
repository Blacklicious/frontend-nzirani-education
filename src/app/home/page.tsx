import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[100%] p-4">
      <main className='text-xl'>
        <h1>Bienvenue au Centre de Formation Nzirani</h1>
        <p>Votre chemin vers l'éducation et la formation technologique.</p>
        <div className=''>
          <Image
            src="/images/hero.jpg"
            alt="Centre de Formation Nzirani"
            width={800}
            height={400}
          />
        </div>
        <section className=''>
          <h2>Nos Cours</h2>
          <p>Découvrez nos programmes de formation conçus pour vous aider à maîtriser les technologies de demain.</p>
        </section>
      </main>
    </div>
  )
};
