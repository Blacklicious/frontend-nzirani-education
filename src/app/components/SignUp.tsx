'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
          phone_number: phoneNumber,
        }),
      });

      // Check if the response is not ok
      if (!response.ok) {
        // Try to parse the response as JSON
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || 'Something went wrong';
        } catch (err) {
          // If parsing as JSON fails, use the status text
          errorMessage = response.statusText;
        }
        console.error('Signup error:', errorMessage);
        return;
      }

      // If the response is ok, parse it as JSON
      const data = await response.json();

      router.push('/dashboard'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className='flex flex-col py-3 w-[100%]'>
      <input className='w-[100%] mb-3 rounded py-1 px-3' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input className='w-[100%] mb-3 rounded py-1 px-3' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <input className='w-[100%] mb-3 rounded py-1 px-3' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className='w-[100%] mb-3 rounded py-1 px-3' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
      <input className='w-[100%] mb-3 rounded py-1 px-3' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <input className='w-[100%] mb-3 rounded py-1 px-3' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
      <button className='w-[100%] rounded py-1 px-3 bg-blue-100 hover:bg-blue-200' onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
