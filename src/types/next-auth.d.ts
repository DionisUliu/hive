import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      /** The user's id . */
      id: string | undefined;
      email: string | undefined;
      image: string | undefined;
      name: string | undefined;
      role: string | undefined;
      userId: string | undefined;
      score: number | undefined;
      gender: string | undefined;
      company: string | undefined;
      tokens: number | undefined;
      level: number | undefined;
    };
  }
  interface Token extends DefaultJWT {
    score: number | undefined;
  }
}
