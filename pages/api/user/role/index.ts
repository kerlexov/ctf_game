import {teams} from "../../../../src/utility";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
            const roles = await teams.listMemberships("admin")
            if (roles.total > 0) {
                let isOk: boolean
                roles.memberships.map((value, index, array) => {
                    if (req.body.userId === value.userId) {
                        isOk = true;
                        res.status(200).json({success: true})
                    }
                })
                if(!isOk){
                    res.status(200).json({success: false})
                }
            }else{
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
