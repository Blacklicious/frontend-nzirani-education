import Image from "next/image";
import styles from './Landing.module.css';
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Landing() {
  return (
    <div className="w-[100%] p-4">
      <Navbar />
      <main className='text-xl'>
      <div className={styles.container}>
        <div className={styles.overlay}>
          <div className="text-center text-[68px] font-bold mt-6 ">Bienvenue </div>
            <div className=' h-[500px] rounded flex items-center mt-[-1px]'>
              <Image
                src="/img/landing1.png"
                alt="Centre de Formation Nzirani"
                width={800}
                height={800}
                className="object-contain w-[100%] h-[100%]"
              />
            </div>
            <div className="absolute h-[200px] w-[100%] top-[550px] bottom-0 left-0 right-0 p-3">
              <div className='  bg-blue-900 rounded-xl w-[100%]
                border-[4px] border-black/80 p-3 flex flex-col justify-center items-center'>
                  <div className=" my-2 w-[100%] text-center text-white text-lg">
                    Nzirani Education le digital conçus pour vous préparer aux défis du secteur. 
                  </div>
                  <Link href="/home" className="w-[90%]">
                    <div className="p-2 text-black bg-white rounded-lg text-center text-2xl
                    font-bold w-[100%] mt-3 hover:bg-blue-600 hover:text-white">
                      Explorez
                    </div>
                  </Link>
              </div>
            </div>
          </div>
      </div>
      </main>
    </div>
  )
};
