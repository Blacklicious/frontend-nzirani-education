'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        return;
      }

      const data = await response.json();
      Cookies.set('access_token', data.access, { secure: true, sameSite: 'Lax' });
      Cookies.set('refresh_token', data.refresh, { secure: true, sameSite: 'Lax' });

      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className='flex flex-col py-3 w-[100%]'>
      <input
        className='w-[100%] mb-3 rounded py-1 px-3'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className='w-[100%] mb-3 rounded py-1 px-3'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className='w-[100%] rounded py-1 px-3 bg-blue-100 hover:bg-blue-200'
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;