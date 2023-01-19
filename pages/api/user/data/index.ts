import {users} from "../../../../src/utility/awnodeClient";

const handler = async (req: any, res: any) => {
    if (req.method === 'GET') {
        // try {
        //     const promise = await users.updatePassword(req.body.userId, req.body.password)
        //     if(promise) {
        //         res.status(200).json({success: true, promise})
        //     }else{
        //         res.status(200).json({success: false, promise})
        //     }
        // }catch (e) {
        //     res.status(200).json({success: false, err: e})
        // }
    }
}

export default handler;
