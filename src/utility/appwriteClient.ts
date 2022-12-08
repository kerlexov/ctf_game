import {Account, Appwrite, dataProvider, Storage} from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://kbc.cloud.karber.hr/v1";
const APPWRITE_PROJECT = "637e412ccb434aa524ad";
const DATABASE_ID = "63802129cb88edc7526f";
const RESOURCE_CHALLENGE = "6380213352b807797847";
const BUCKET_ID = "6388f55adfd672515271";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const options = { databaseId: DATABASE_ID }

const customDataProvider = dataProvider(appwriteClient, {
    databaseId: DATABASE_ID,
});

export function parseResource(resource: string) {
    switch (resource){
        case "challenge": {
           return resources.challenge
        }
        default:{
            break;
        }
    }
    return "";
}

const resources = {  challenge: RESOURCE_CHALLENGE}

export { appwriteClient, account, storage, options, resources,customDataProvider,BUCKET_ID };
