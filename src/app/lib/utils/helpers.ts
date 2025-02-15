import bcrypt from "bcryptjs";

export const comparePasswords = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};
