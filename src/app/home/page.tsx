import Image from "next/image";
import Courses from "../schools/courses/page";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="w-[100%]">
      <Navbar />
      <main className='text-xl  p-4'>
        <div className=" justify-between items-center h-[100%] my-2 flex">
          <div className="h-[100%] w-[69%] bg-white rounded-lg p-2 flex items-center">
            Search Bar 
          </div>
          <div className="h-[100%] w-[13%] bg-blue-200 p-1 text-3xl text-center rounded-lg">
          🔍
          </div>
          <div className="h-[100%] w-[13%] bg-orange-200 p-1 text-3xl text-center rounded-lg">
          ⚙️
          </div> 
        </div>
        <div className=" mt-6 mb-4">
          <div className="h-[180px] w-[100%] bg-blue-800 rounded-lg flex  text-white">
            <div className="w-[35%] text-[15px] p-2  text-center">
              <div>Votre chemin vers l'éducation et la formation.</div>
              <div className="mt-3 bg-gray-100 rounded text-gray-500 ">button</div>
            </div>
            <div className='bg-gray-200/50 w-[64%] rounded '>
              <Image
                src="/images/hero.jpg"
                alt="Centre de Formation Nzirani"
                width={800}
                height={400}
                className="h-[100%]"
              />
            </div>
          </div>
        </div> 
        <section className=''>
          <div className="text-xl font-semibold">Nos Recommendation</div>
          <div className="h-[120px] w-[100%] bg-blue-800 rounded-lg p-2 flex
           justify-between my-2">
            <div className="h-[100%] w-[25%] bg-gray-200 border-[20px] broder-white rounded"></div>
            <div className="h-[100%] w-[74%] px-2 text-white flex flex-col justify-between"> 
              <div>
                <div>Meilleur Instructeur Tech</div>
                <div className="text-[14px] mt-[-4px]">Le Cours le plus populaire</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[65%] flex flex-col justify-center">
                  <div className="flex items-end text-[13px] mb-[-9px]">150.000 fcfa / 2 mois</div>
                  <div className="flex items-end text-[12px]">⭐⭐⭐⭐⭐ (500votes)</div>
                </div>
                <div className="w-[33%] bg-gray-100/70 text-black py-[5px]
                 rounded text-center text-[16px]">
                  S'inscrire
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6"> Les cours</div>
          <div>
            <Courses />
          </div>
        </section>
      </main>
    </div>
  )
};
