import vaultClient from "../../../src/utility/vaultClient";
import {ResultRecord, ResultRecordData} from "../../../src/interfaces";
import {users} from "../../../src/utility/awnodeClient";
import {hashData} from "../../../src/utility";


const handler = async (req: any, res: any) => {
    if (req.method === 'GET') {
        const resultRecord: ResultRecord = {};

        const resChallenges = await vaultClient.list(`secret/metadata/ctf/app/score`);
            if (resChallenges.__data.keys && resChallenges.__data.keys.length > 0) {
                     await Promise.all(resChallenges.__data.keys.map(async (challenge: any) => {
                        // hash od challenge name -> uk
                        // listat sve usere koji su rijesili
                        const resUsers = await vaultClient.list(`secret/metadata/ctf/app/score/${challenge}`)
                        if (resUsers.__data.keys && resUsers.__data.keys.length > 0) {
                           await Promise.all(resUsers.__data.keys.map(async (user: any) => {
                                //dohvatit svaki zapis i uzet broj bodova
                                const result = await vaultClient.read(`secret/data/ctf/app/score/${challenge}/${user}`)
                                if (result && result.__data.data.points) {
                                    if(resultRecord[user]){
                                        resultRecord[user] = resultRecord[user] + result.__data.data.points;
                                    }else {
                                        resultRecord[user] = result.__data.data.points
                                    }
                                }
                            }));
                        }
                    }));

                 let final:ResultRecordData[]= []
                    const useri = await users.list()
                        useri.users.map((u:any)=>{
                            if(resultRecord[hashData(u.$id)]){
                                const nes = {
                                    name: u.name,
                                    points: resultRecord[hashData(u.$id)],
                                }
                                final.push(nes)
                            }
                        })

                res.status(200).json({
                        data: final,
                    })
                }else{
                res.status(200).json({
                    data: [],
                })
            }
    }
}

export default handler;
