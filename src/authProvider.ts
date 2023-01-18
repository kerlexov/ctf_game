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
  return Promise.reject()
}
async function Login(data: ILoginForm) {
  const acc = await account.createEmailSession(data.email, data.password)
  if(acc){
    account.createJWT().then(r => {
      if(r){
        nookies.set(null, "c", JSON.stringify(r.jwt), {
          maxAge: 1 * 60 * 60,
          path: "/",
        });
        nookies.set(null, "a", JSON.stringify(acc.userId), {
          maxAge: 1 * 60 * 60,
          path: "/",
        });
        return Promise.resolve();
      }
    })
    return Promise.resolve()
  }
}
export const authProvider: AuthProvider = {
  login: ({email, password}) => {
    return Login({email,password,remember:false})
  },
  register: ({create_email, create_password, create_name}) => {
    return Register({create_email, create_password, create_name})
  },
  logout: (ctx) => {
    nookies.destroy(ctx, "a");
    nookies.destroy(ctx, "c");
    const nes = account.deleteSession("current");
    nes.catch((err)=>{
      console.log(err)
      console.log("lgout AP error")
      return Promise.reject()
    })

    return Promise.resolve();
  },
  checkAuth: (ctx) => {
    const jwt = JSON.parse(nookies.get(ctx)["c"]);
    const aid =JSON.parse(nookies.get(ctx)["a"]);
    if(jwt&&aid) {
      const decoded = jwt_decode<JwtPayloadCustom>(jwt);
      if (decoded && decoded.userId && decoded.sessionId && decoded.exp > Date.now() / 1000 && decoded.userId == aid) {
        return Promise.resolve(jwt)
      }
    }
    nookies.destroy(ctx, "c");
    nookies.destroy(ctx, "a");
    return Promise.reject();
  },
  checkError: (error) => {
    if (error.statusCode === 401) {
      return Promise.reject("/login");
    }
    console.log("checkError auth not 401")
    console.log(error)
    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
  getUserIdentity: (ctx) => {
    const jwt = JSON.parse(nookies.get(ctx)["c"]);
    const aid =JSON.parse(nookies.get(ctx)["a"]);
    if(jwt&&aid) {
      const decoded = jwt_decode<JwtPayloadCustom>(jwt);
      if (decoded && decoded.userId && decoded.sessionId && decoded.exp > Date.now() / 1000 && decoded.userId == aid) {
        return Promise.resolve(decoded.userId)
      }
    }
    return Promise.reject();
  },
};
