import {
    BaseRecord,
    GetOneResponse,
    IResourceComponentsProps,
    parseTableParamsFromQuery, useGetIdentity,
    useOne,
    useShow
} from "@pankod/refine-core";
import {Show, Typography, Tag, Button, Card, Input, Col, Row, notificationProvider} from "@pankod/refine-antd";
import React, {useState} from "react";
import {IChallenge, IFile, UploadFiles} from "../../interfaces";
import {customDataProvider, encryptVault, hashData, mask, resources} from "../../utility";
import {GetServerSideProps} from "next";
import {Convert} from "../../utility/convert";
const { Title, Text } = Typography;

export const ChallengeShow: React.FC<
    IResourceComponentsProps<GetOneResponse<IChallenge>>
    > = ({ initialData }) => {

// export const ChallengeShow: React.FC = () => {
//     const { queryResult } = useShow({
//         resource: resources.challenge
//     });
//     const { data, isLoading } = queryResult;
    const record = initialData?.data

    const [answer, setAnswer] = useState("")
    const {data: identity} = useGetIdentity();

    function RenderFiles(raw: any) {
        const uploadFiles = Convert.toUploadFiles(raw);
        //console.table(result)
        //console.table(uploadFiles)
        return uploadFiles.map((v:UploadFiles,i:number,a:UploadFiles[])=>{
            return <><a href={v.url} download>
                <button style={{margin:"2em"}}>Dowload file <Tag>{v.name}</Tag></button>
            </a></>}
        )

    }

    return (
        <Show>
            <Card>
                <Row justify="start">
                    <Col span={4}>
                        <Title level={5}>Name</Title>
                        <Text>{record?.name}</Text>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>Difficulty</Title>
                        <Text>{record?.difficulty}</Text>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>Points</Title>
                        <Text>{record?.points}</Text>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>Files</Title>
                        <Text>{record?.files?<>
                            {
                                RenderFiles(record.files)
                            }
                        </>:"File not uploaded"}</Text>
                    </Col>
                </Row>

                <Title level={5}>Description</Title>
                <Text>
                    {record?.description}
                </Text>







            </Card>


            <Card style={{marginTop:"2em"}}>
                <Input placeholder="Flag(THIS_IS_FLAG)" name="inputFlag"
                   value={answer} onChange={(v)=>{
                       setAnswer(v.target.value)
                    }
                }>

                </Input>
                <Button style={{marginTop:"2em"}} onClick={()=>{
                    console.log(record)
                    console.log(answer)
                    VerifyAnswer(record?.name!, record?.author_id!, answer, identity,record?.points!,record?.id!)
                        .then((r) =>{
                            if(r){
                                notificationProvider.open({message:"Congrats, challenge solved",key:"challenge_success",type:"success"})
                            }else {
                                notificationProvider.open({message:"Wrong answer, try again",key:"challenge_fail",type:"error"})
                            }
                        })
                        .catch((e)=>{
                            console.log(e)
                        })
                }}>
                    SOLVE
                </Button>

            </Card>
        </Show>
    );
};

export async function VerifyAnswer(name: string, author: string, flag: string, identity: string, points: number, cid: string){
    const encFlag = hashData(flag)
    const resp = await fetch('/api/vault/verify',{
        method: "POST",
        body: JSON.stringify({
            name,author,encFlag, identity, points,cid
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    const datarsp = await resp.json()

    return datarsp.correct
    //console.log(datarsp)
}
export default ChallengeShow;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
//         parseTableParamsFromQuery(context.query);
//
//     console.log(parsedCurrent)
//     console.log(parsedPageSize)
//     console.log(parsedSorter)
//     console.log(parsedFilters)
//     const data = await customDataProvider.getOne({
//         resource: resources.challenge,
//         id: "1"
//     });
//
//     return {
//         props: { initialData: data },
//     };
// };
