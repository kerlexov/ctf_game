import {account} from "../../../../src/utility";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
            const promise = await account.updateRecovery(req.body.u, req.body.s, req.body.p, req.body.p)
            if (promise) {
                res.status(200).json({success: true})
            } else {
                res.status(200).json({success: false})
            }
        } catch (e) {
            res.status(400).json({success: false, e})
        }
    }else{
        res.status(400)
    }
}

export default handler;
