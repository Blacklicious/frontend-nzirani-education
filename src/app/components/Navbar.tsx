'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {MenuOutlined} from '@ant-design/icons';
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !menuButtonRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav>
      <div className='w-[100] h-[90px] mb-[1px] px-2'>
        <div className='bg-black/90 h-[100%] rounded-lg flex justify-between'>
          <div className='h-[100%] w-[100px] p-2'>
            <Link href="/home">
              <div className='bg-gray-100 h-[100%] rounded'></div>
            </Link>
          </div>
          <div 
            className='h-[100%] w-[70px] p-2'
            tabIndex={0}
            onClick={handleOnClick}
            ref={menuButtonRef}
          >
            <div className='bg-gray-100 h-[100%] rounded flex items-center 
            text-3xl font-extrabold justify-center hover:bg-gray-300'><MenuOutlined /></div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div ref={menuRef} className='w-[100%] text-white px-3 pb-2 text-xl'>
          <ul className='flex flex-col bg-white border-x-[4px] border-b-[4px] p-3 rounded-b-lg text-black'>
            <li className='border-[3px] p-3 mb-3 rounded-lg bg-gray-100'>
              <div className='text-black flex justify-between text-center mb-3'>
                <Link href="/authentication" className='w-[50%]'>
                  <div className='hover:ring-2 rounded py-1 px-2 bg-gray-200 hover:bg-blue-100'>
                    Identification
                  </div>
                </Link>
                <Link href="/registration" className='w-[45%]'>
                  <div className='hover:ring-2 rounded py-1 px-2 bg-gray-200 hover:bg-blue-100'>
                    Inscription
                  </div>
                </Link>
              </div>
              <Link href="/dashboard" className='w-[100%]'>
                <div className='hover:ring-2 rounded py-1 px-2 bg-gray-200 hover:bg-blue-100 text-center mb-3'>
                  Tableau de bord
                </div>
              </Link>
              <Link href="/logout" className='w-[100%]'>
                <div className='hover:ring-2 rounded py-1 px-2 bg-gray-200 hover:bg-blue-100 text-center'>
                  Déconnexion
                </div>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <div className='hover:ring-2 rounded py-2 px-4 bg-gray-200 text-black hover:bg-blue-100 mb-3'>
                  À propos
                </div>
              </Link>
            </li>
            <div>
              <li>
                <Link href="/schools">
                  <div className='hover:ring-2 rounded py-2 px-4 bg-gray-100 text-black hover:bg-blue-100 mb-3'>
                    Nos Services
                  </div>
                </Link>
              </li>
              <div>
                <li className='flex space-x-2 my-2 ml-3'>
                  <div className='w-[5%]  text-right'>|-</div>
                  <Link href="/schools/courses/" className='w-[95%]'>
                    <div className='hover:ring-2 rounded py-1 px-2 w-[100%] bg-gray-100 text-black hover:bg-blue-100'>
                      Formations
                    </div>
                  </Link>
                </li>
                <li className='flex space-x-2 mb-3 ml-3'>
                  <div className='w-[5%] text-right'>|-</div>
                  <Link href="/schools/instructors/" className='w-[94%]'>
                    <div className='hover:ring-2 rounded py-1 px-2 w-[100%] bg-gray-100 text-black hover:bg-blue-100'>
                      Instructeurs
                    </div>
                  </Link>
                </li>
              </div>
            </div>
            <li>
              <Link href="/contact">
                <div className='hover:ring-2 rounded py-2 px-4 bg-gray-100 text-black hover:bg-blue-100'>
                  Contact
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
