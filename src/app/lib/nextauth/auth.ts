import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../db";
import { findUserByEmail } from "@/app/api/auth/register/repository";
import { comparePasswords } from "../utils/helpers";
import { config } from "../utils/config";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or passsword")
                }
                try {
                    await connectDB()
                    const user = await findUserByEmail(credentials.email)
                    if (!user) {
                        throw new Error("User not found")
                    }
                    const isPasswordCorrect = await comparePasswords(credentials.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error("Invalid password")
                    }
                    return {
                        id: user?._id?.toString(),
                        email: user?.email
                    }
                } catch (error) {
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token?.id as string
            }
            return session
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: config.nextAuthSecret
}