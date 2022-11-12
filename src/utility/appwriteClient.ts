import { Appwrite, Account, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://kbc.cloud.karber.hr:/v1";
const APPWRITE_PROJECT = "636f9a36b34e820c15e8";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };
