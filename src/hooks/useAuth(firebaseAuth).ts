import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from '../firebaseConfig';

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a ProvideAuth');
  }
  return context;
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  const signInWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signUpWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signOutUser = () => {
    return signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithEmail,
    signUpWithEmail,
    signOut: signOutUser,
  };
}
