'use client';

import Image from "next/image";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {MenuOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Login from "./Login";
import Signup from "./SignUp";
import Cookies from 'js-cookie';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupForm, setSignupForm] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();


  const handleOnClick = () => {
    setMenuOpen(!menuOpen);
  };
  const OnClickLogin = () => {
    setLoginForm(!loginForm);
    setSignupForm(!signupForm);
  };
  const OnClickSignup = () => {
    setSignupForm(!signupForm);
    setLoginForm(!loginForm);
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
          setUser(null);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout/`, {
        method: 'POST',
      });

      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      setUser(null);
      router.push('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav>
      <div className='w-[100] h-[90px] mb-[1px] px-3'>
        <div className='bg-black/90 h-[100%] rounded-lg flex justify-between'>
          <div className='h-[100%] w-[100px] p-2'>
            <Link href="/home">
              <div className=' h-[100%] rounded flex items-center'>
                <Image
                  src="/img/LogoNziEdu.png"
                  alt="Centre de Formation Nzirani"
                  width={100}
                  height={200}
                  className="object-contain w-[100%] h-[120%]"
                />
              </div>
            </Link>
          </div>
          <div 
            className='h-[100%] w-[70px] p-3'
            tabIndex={0}
            onClick={handleOnClick}
            ref={menuButtonRef}
          >
            <div className=" border-yellow-500 border-[2px] h-[100%] ring-[2px]
             ring-green-600 rounded-md">
              <div className='bg-gray-100/80 border-red-600 border-[2px] h-[100%] rounded-[3px] flex items-center 
              text-3xl font-extrabold justify-center hover:bg-gray-300'><MenuOutlined /></div>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div ref={menuRef} className='w-[100%] text-white px-3 pb-2 text-xl  shadow-lg'>
          <ul className='flex flex-col bg-white border-x-[4px] border-b-[4px] p-3 rounded-b-lg text-black'>
            <li className='border-[3px] p-3 mb-3 rounded-lg bg-gray-100'>
            {user ? (
              <>
                <Link href="/dashboard" className='w-[100%]'>
                  <div className='hover:ring-2 rounded py-1 px-2 bg-gray-200 hover:bg-blue-100 text-center mb-3'>
                    Tableau de bord
                  </div>
                </Link>
                <div className='w-[100%]' onClick={logout}>
                  <div className='hover:ring-2 rounded py-1 px-2 bg-gray-200 hover:bg-blue-100 text-center'>
                    Déconnexion
                  </div>
                </div>
              </>
            ) : (
              <div className=' rounded-lg bg-gray-100'>
                <div className='text-black flex flex-wrap justify-between text-center'>
                    <div className='w-[49%] hover:ring-2 rounded py-1 px-2 bg-white hover:bg-blue-100'
                      onClick={OnClickLogin}>
                      Identification
                    </div>
                  <div className='w-[49%] hover:ring-2 rounded py-1 px-2 bg-white hover:bg-blue-100'
                      onClick={OnClickSignup}>
                      Inscription
                    </div>
                  {loginForm && (< Login />)}
                  {signupForm && (< Signup/>)}
                </div>
              </div>
            )}
            </li>
            <div>
              <li>
                <Link href="/schools" onClick={handleOnClick}>
                  <div className='hover:ring-2 rounded py-2 px-4 bg-gray-100 text-black hover:bg-blue-100 mb-3'>
                    Nos Services
                  </div>
                </Link>
              </li>
              <div>
                <li className='flex space-x-2 my-2 ml-3'>
                  <div className='w-[5%]  text-right'>|-</div>
                  <Link href="/schools/courses/" className='w-[95%]' onClick={handleOnClick}>
                    <div className='hover:ring-2 rounded py-1 px-2 w-[100%] bg-gray-100 text-black hover:bg-blue-100'>
                      Formations
                    </div>
                  </Link>
                </li>
                <li className='flex space-x-2 mb-3 ml-3'>
                  <div className='w-[5%] text-right'>|-</div>
                  <Link href="/schools/instructors/" className='w-[94%]' onClick={handleOnClick}>
                    <div className='hover:ring-2 rounded py-1 px-2 w-[100%] bg-gray-100 text-black hover:bg-blue-100'>
                      Instructeurs
                    </div>
                  </Link>
                </li>
              </div>
            </div>
            <li>
              <Link href="/about"  onClick={handleOnClick}>
                <div className='hover:ring-2 rounded py-2 px-4 bg-gray-200 text-black hover:bg-blue-100 mb-3'>
                  Qui sommes nous 
                </div>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={handleOnClick}>
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
