import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { SigninBody } from '@/lib/utilities/types';
import * as dal from '@/lib/modules/users/users.dal';

export function authOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  return {
    providers: [
      CredentialsProvider({
        type: 'credentials',
        credentials: {},
        async authorize(credentials) {
          const { email, password } = credentials as SigninBody;

          try {
            const foundUser = await dal.findUser({ email });

            if (foundUser && foundUser.password) {
              const passwordsMatch = await bcrypt.compare(
                password,
                foundUser?.password,
              );
              if (passwordsMatch) return foundUser;
            }

            return null;
          } catch (error) {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token }) {
        if (token.email) {
          const foundUser = await dal.findUser({ email: token.email });
          if (foundUser) {
            token.id = foundUser.id;
            token.name = foundUser.firstName + ' ' + foundUser.lastName;
            token.gender = foundUser.gender;
          }
          return token;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id as any;
        session.user.name = token.name as any;
        session.user.gender = token.gender as any;
        return session;
      },
    },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions(req, res));
}
