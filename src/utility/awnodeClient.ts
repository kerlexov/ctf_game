import sdk from "node-appwrite";

const client = new sdk.Client();

const users = new sdk.Users(client);
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.AWSID);

export {users, client}
