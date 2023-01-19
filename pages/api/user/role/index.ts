import {teams} from "../../../../src/utility";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
            const roles = await teams.listMemberships("admin")
            if (roles.total > 0) {
                roles.memberships.map((value, index, array) => {
                    if (req.body.userId === value.userId) {
                        res.status(200).json({success: true})
                    }
                })

            }
        } catch (e) {
            res.status(200).json({success: false})
        }
        res.status(200).json({success: false})
    }
}

export default handler;
