import {decryptVault, hashData, sec} from "../../../src/utility";
import vaultClient from "../../../src/utility/vaultClient";

const handler = (req:any, res:any) => {
    if (req.method === 'POST') {
    //name,author,encFlag,
        const dec = decryptVault({vault:req.body.encFlag, vaultKey: hashData(req.body.name+"_"+sec+"_"+req.body.author)})
        vaultClient.write("secret/data/ctf/app/"+hashData(req.body.name), {data:{encFlag: req.body.encFlag, flag: dec}}).then((r:any) =>{
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
