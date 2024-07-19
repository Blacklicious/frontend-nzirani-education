'use client';// pages/dashboard.tsx

import { auth } from '../../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/users/login'); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {user.email}!</h1>
      {/* Add your dashboard content here */}
      <p>You are logged in. {user.uid}</p>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
};

export default Dashboard;
