export const config = {
    port: process.env.PORT,
    mongoDbUri: process.env.MONGODB_URI,
    mongoDbDatabaseName: process.env.MONGODB_DB_NAME,
    nextAuthSecret: process.env.NEXT_AUTH_SECRET,
}