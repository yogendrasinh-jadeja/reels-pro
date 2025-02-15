import mongoose, { Mongoose } from "mongoose";
import { config } from "../utils/config.js";

interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseConn;
}

let cached: MongooseConn = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    cached.promise =
        cached.promise ||
        mongoose.connect(config.mongoDbUri as string, {
            dbName: config.mongoDbDatabaseName,
            bufferCommands: true,
            connectTimeoutMS: 30000,
        });

    cached.conn = await cached.promise;
    console.log("database connected");

    return cached.conn;
}

export default dbConnect;
