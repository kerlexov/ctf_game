import {account, users} from "../../../../src/utility";

const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
            const useri = await users.list()
            useri.users.map(async (u: any) => {
                if (u.email === req.body.email) {
                    const promise = await account.createRecovery(u.email, 'https://ctf-game.vercel.app');
                    if(promise){
                        res.status(200).json({success: true})
                    }else{
                        res.status(200).json({success: false})
                    }
                }
            })

        }catch (e) {
            res.status(200).json({success: false})
        }
    }
}

export default handler;
