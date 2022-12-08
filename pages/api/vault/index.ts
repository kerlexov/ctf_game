import {decryptVault, hashData, sec} from "../../../src/utility";
import vaultClient from "../../../src/utility/vaultClient";

const handler = (req:any, res:any) => {
    if (req.method === 'POST') {
    //name,author,encFlag,
        const dec = decryptVault({vaultKey:req.body.encFlag,vault: hashData(req.body.name+"_"+sec+"_"+req.body.author)})
        vaultClient.approleLogin({
            role_id: "47403516-81b1-72ab-2d9c-338104463d2b",
            secret_id: "891b8f30-ee1a-2a45-df7e-d771b4e82f80",
        }).then((result:any)=>{
            vaultClient.token = result.auth.client_token;
        });

        vaultClient.write("secret/ctf/"+hashData(req.body.name), {encFlag: req.body.encFlag, flag: dec}).then((r:any) =>{
            console.log("ovo je vault response")
            console.log(r)
            res.status(200).json({ data: r})
        }).catch((e:any)=>{
            res.status(500).json({err:e})
        })

        // const vval = readVault("secret/data/ctf/app")
        //console.log(vval)

    } else {
        // Handle any other HTTP method
    }
}

export default handler;
