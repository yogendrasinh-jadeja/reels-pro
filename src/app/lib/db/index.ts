import mongoose, { Connection } from "mongoose";
import { config } from "../utils/config.js";

if (!config.mongoDbUri) {
    throw new Error("Please define MongoDB URI in the env file");
}

declare global {
    var mongooseCache: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectDB = async (): Promise<Connection> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        cached.promise = mongoose.connect(`${config.mongoDbUri}/${config.mongoDbDatabaseName}`, options).then(
            (connection) => connection.connection
        );
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Check database connection file");
    }

    return cached.conn;
};
