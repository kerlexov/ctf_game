import {dataProvider} from "@pankod/refine-appwrite";
import { Client, Account, Storage } from "appwrite";

import * as process from "process";
const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
const appwriteClient = new Client();

appwriteClient.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const options = { databaseId: process.env.NEXT_PUBLIC_DATABASE_ID }
const customDataProvider = dataProvider(appwriteClient, options);
const resources = {  challenge: process.env.NEXT_PUBLIC_RESOURCE_CHALLENGES}

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

export { appwriteClient, account, storage, options, resources,customDataProvider,BUCKET_ID };
