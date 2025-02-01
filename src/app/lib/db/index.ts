import mongoose, { Connection } from "mongoose";
import { config } from "../utils/config.js";

if (!config.mongoDbUri) {
    throw new Error("please define mongodb uri in env file")
}

declare global {
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null
    }
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
    if(cached){
        return cached.conn
    }

    if(!cached.promise){
        const options = {
             bufferCommand:true,
             maxPoolSize:10
        }
    }

    cached.promise  = await mongoose.connect(`${config.mongoDbUri}/${config.mongoDbDatabaseName}`)
}


// try {
//     const connectionInstance = await mongoose.connect(`${config.mongoDbUri}/${config.mongoDbDatabaseName}`)
//     console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
// } catch (error) {
//     console.log("MONGODB connection FAILED ", error);
//     process.exit(1)
// }