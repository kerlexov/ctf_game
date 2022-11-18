import {Account, Appwrite, dataProvider, Storage} from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://kbc.cloud.karber.hr/v1";
const APPWRITE_PROJECT = "636f9a36b34e820c15e8";
const DATABASE_ID = "636fb1bbc8d1f78b47a1";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const options = { databaseId: DATABASE_ID }

const customDataProvider = dataProvider(appwriteClient, {
    databaseId: DATABASE_ID,
});

const RESOURCE_CHALLENGE = "636fb211985274ef42f2";

const resources = { challenge: RESOURCE_CHALLENGE}

export { appwriteClient, account, storage, options, resources,customDataProvider };
