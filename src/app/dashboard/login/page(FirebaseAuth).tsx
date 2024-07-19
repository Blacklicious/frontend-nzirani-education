'use client';// pages/login.tsx
import { useState } from 'react';
import { auth } from '../../../../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/users'); // Redirect to protected route
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const goToSignup = () => {
    router.push('/users/signup'); // Navigate to the signup page
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={goToSignup}>Go to Signup</button> {/* Button to go to signup page */}
   
    </div>
  );
};

export default Login;
