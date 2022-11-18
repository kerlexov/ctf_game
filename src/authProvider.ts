import { AuthProvider } from "@pankod/refine-core";
import nookies from "nookies";
import { account } from "./utility";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password).then(s=>{
        if(s){
          nookies.set(null, "auth", JSON.stringify(s), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
        }
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  },
  logout: async () => {
    await account.deleteSession("current").finally(()=>{
      nookies.destroy(null, "auth");
    });

    return "/";
  },
  checkError:(error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: async (ctx) => {
      const cookies = nookies.get(ctx);
      return cookies["auth"] ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: async (ctx) => {
    return nookies.get(ctx)["auth"] ? Promise.resolve() : Promise.reject();
  },
};
