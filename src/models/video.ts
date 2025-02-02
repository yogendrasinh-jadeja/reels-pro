import mongoose, { model, Schema, Types, models } from "mongoose";
import bcrypt from "bcryptjs"

export const videoDimension = {
    width: 1080,
    height: 1920
} as const

export interface IVideo {
    _id?: Types.ObjectId
    title: string
    description: string
    videoUrl: string
    thumbnailUrl: string
    controls?: boolean
    transformation?: {
        width: number,
        height: number,
        quality?: number
    }
    createdAt?: Date
    updatedAt?: Date
}
const videoSchema = new Schema<IVideo>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        controls: {
            type: Boolean,
            default: true
        },
        transformation: {
            height: { type: Number, default: videoDimension.height },
            width: { type: Number, default: videoDimension.width },
            quality: { type: Number, min: 1, max: 100 },
        }
    },
    {
        timestamps: true,
    }
);

export const dbVideo = models?.Video || model<IVideo>("Video", videoSchema);