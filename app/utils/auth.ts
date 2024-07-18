import { NextAuthOptions } from "next-auth"
//Providers
import GitHubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"
import { CheckMasterPassword } from "./getMasterPassword"

export const authOptions = {
  //Vamos apontar os providers que desejamos utilizar, como Github, Google, Email (Send link magic)
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, //Permite o login com email
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      return true
    },
  },
} satisfies NextAuthOptions //Estamos satisfazendo o nosso objeto com informações de opções que são apenas do NextAuthOptions
