import { dbUser } from "@/models/user";

export async function findUserByEmail(email: string) {
    return dbUser.findOne({ email });
}

export async function createUser(email: string, password: string) {
    return dbUser.create({ email, password });
}
