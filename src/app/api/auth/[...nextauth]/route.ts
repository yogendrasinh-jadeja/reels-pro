import { authOptions } from "@/app/lib/nextauth/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }