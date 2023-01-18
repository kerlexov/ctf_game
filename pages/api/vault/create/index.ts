import {hashData, resources} from "../../../../src/utility";
import vaultClient from "../../../../src/utility/vaultClient";
import {database} from "../../../../src/utility/awnodeClient";
import {options} from "../../../../src/utility/appwriteClient";
import {ID} from "appwrite";
import {Permission, Role} from "node-appwrite";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        const createPromis = await database.createDocument(
            options.databaseId,
            resources.challenge,
            ID.unique(),
            {
                    ...req.body.values,
                    files: JSON.stringify(req.body.values.files),
                    flag: "",
                    author_id: req.body.id,
                },
            [
                Permission.read(Role.any()),
                Permission.write(Role.team("admin", "admin"))
            ]).catch((e: any) => {
            res.status(500).json({err: e})
        })

      const vaultPromise = await vaultClient.write(`secret/data/ctf/app/${hashData(req.body.name)}`,
            {data: {encFlag: req.body.encFlag, id: req.body.id}})
            .catch((e: any) => {
            res.status(500).json({err: e})
        })

        try {
            const done = await Promise.all([createPromis, vaultPromise])
            if (done) {
                res.status(200).json({success: true, done})
            }
        }catch (e) {
            res.status(500).json({err: e})
        }
    }
}

export default handler;
