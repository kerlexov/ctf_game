import {account} from "./utility";
import {AuthProvider} from "@pankod/refine-core";
import nookies from "nookies";
import {ID} from "appwrite";
import {ILoginForm, IRegisterForm} from "./interfaces";
import jwt_decode, {JwtPayload, JwtPayloadCustom} from 'jwt-decode';
2
async function Register(data: IRegisterForm) {
  const acc = await account.create(ID.unique(), data.create_email, data.create_password, data.create_name)
  if(acc){
    return Promise.resolve()
  }
}
async function Login(data: ILoginForm) {
  const acc = await account.createEmailSession(data.email, data.password)
  if(acc){
    account.createJWT().then(r => {
      if(r){
        nookies.set(null, "cookey", JSON.stringify(r), {
          maxAge: 1 * 60 * 60,
          path: "/",
        });
        return Promise.resolve();
      }
    })
    return Promise.resolve()
  }
}

declare module 'jwt-decode' {
  export interface JwtPayloadCustom extends JwtPayload {
    userId: string
    sessionId: string
//        exp: number
  }
}
export const authProvider: AuthProvider = {
  login: ({email, password}) => {
    return Login({email,password,remember:false})
  },
  register: ({create_email, create_password, create_name}) => {
    //TODO fix register cannot call it async, it needs Promise as response currently throws error on success :D
    return Register({create_email, create_password, create_name})
  },
  logout: (ctx) => {
    const nes = account.deleteSession("current");
    nes.catch((err)=>{
      console.log(err)
      console.log("lgout AP error")
    })
    nookies.destroy(ctx, "auth");
    nookies.destroy(ctx, "cookey");

    return Promise.resolve();
  },
  checkAuth: (ctx) => {
    return nookies.get(ctx)["cookey"] ? Promise.resolve():Promise.reject();
  },
  checkError: (error) => {
    if (error.statusCode === 401) {
      return Promise.reject("/login");
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const jwt = nookies.get()["cookey"];
    if (jwt) {
      const parsedJWT = JSON.parse(jwt);
      const decoded = jwt_decode<JwtPayloadCustom>(parsedJWT.jwt);
      if (decoded && decoded.userId){
        return Promise.resolve(decoded.sessionId);
      }
    }
    return Promise.resolve();
  },
  getUserIdentity: () => {
    const jwt = nookies.get()["cookey"];
    if (jwt) {
      const parsedJWT = JSON.parse(jwt);
      const decoded = jwt_decode<JwtPayloadCustom>(parsedJWT.jwt);
      if (decoded && decoded.userId){
        return Promise.resolve(decoded.userId);
      }
    }
    return Promise.reject();
  },
};
