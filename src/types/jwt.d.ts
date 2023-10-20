import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface Token extends DefaultJWT {
    score: number | undefined;
  }
}
