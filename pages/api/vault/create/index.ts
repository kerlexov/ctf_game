import {database, hashData, options, resources} from "../../../../src/utility";
import {ID, Permission, Role} from "node-appwrite";
import vaultClient from "../../../../src/utility/vaultClient";

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
                res.status(200).json({success: true})
            }
        } catch (e) {
            res.status(500).json({err: e})
        }
    }
}

export default handler;
