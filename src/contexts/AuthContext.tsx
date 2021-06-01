import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { profileUser, singInRequest } from "../services/auth";
import { api } from "../services/api";

interface IAuthContext {
  user: IUser;
  isAuthenticated: boolean;
  signIn: (data: ISignData) => Promise<void>;
}

interface IUser {
  name: string;
  email: string;
  avatar_url: string;
}

interface ISignData {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@NextAuth/token': token } = parseCookies();

    if (token) {
      profileUser().then(response => {
        setUser(response)
      })
    }
  }, []);


  async function signIn({ email, password }: ISignData) {
    const { token, user } = await singInRequest({ email, password });

    setCookie(undefined, '@NextAuth/token', token, {
      maxAge: 60 * 60 * 1  // 1 hour
    });

    setUser(user);

    // Set token in header request axios
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}