import sdk from "node-appwrite";

const client = new sdk.Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.AWSID);
const users = new sdk.Users(client);

const database = new sdk.Databases(client)
export {users, database, client}
