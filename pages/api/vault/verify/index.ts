import {hashData} from "../../../../src/utility";
import vaultClient from "../../../../src/utility/vaultClient";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        const r = await vaultClient.read(`secret/data/ctf/app/${hashData(req.body.name)}`)
        if (r && r.__data.data) {
            if (req.body.encFlag === r.__data.data.encFlag) {
                await vaultClient.write(`secret/data/ctf/app/score/${hashData(req.body.name)}/${hashData(req.body.identity)}`,
                    {data: {id: req.body.cid, points: req.body.points}})
                res.status(200).json({correct: true})
            } else {
                res.status(200).json({correct: false})
            }
        } else {
            res.status(500).json({err: "nodata"})
        }
    }
}

export default handler;
