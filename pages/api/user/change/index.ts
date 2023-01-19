import {users} from "../../../../src/utility/awnodeClient";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
            const promise = await users.updatePassword(req.body.userId, req.body.password)
            if(promise) {
                res.status(200).json({success: true})
            }else{
                res.status(200).json({success: false})
            }
        }catch (e) {
            res.status(200).json({success: false})
        }
    }
}

export default handler;
