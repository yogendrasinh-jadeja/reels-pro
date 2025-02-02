import mongoose, { model, Schema, Types, models } from "mongoose";
import bcrypt from "bcryptjs"

export interface Iuser {
    email: string
    password: string
    _id?: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}
const userSchema = new Schema<Iuser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const dbUser = models?.User || model<Iuser>("User", userSchema);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})