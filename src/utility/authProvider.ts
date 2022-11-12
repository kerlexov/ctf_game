import {AuthProvider} from "@pankod/refine-core";
import {account} from "./index";
import {AppwriteException} from "@pankod/refine-appwrite";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            await account.createEmailSession(email, password);
            return Promise.resolve();
        } catch (e) {
            const { type, message, code } = e as AppwriteException;
            return Promise.reject({
                message,
                name: `${code} - ${type}`,
            });
        }
    },
    logout: async () => {
        await account.deleteSession("current");

        return "/";
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        console.log("checkAuth");
        const session = await account.get();

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const user = await account.get();

        if (user) {
            return user;
        }
    },
};


export { authProvider };
