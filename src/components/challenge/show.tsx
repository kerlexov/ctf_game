import {GetOneResponse, IResourceComponentsProps, useGetIdentity,} from "@pankod/refine-core";
import {Button, Card, Col, Input, notificationProvider, Row, Show, Tag, Typography} from "@pankod/refine-antd";
import React, {useState} from "react";
import {IChallenge, UploadFiles} from "../../interfaces";
import {hashData} from "../../utility";
import {Convert} from "../../utility/convert";

const {Title, Text} = Typography;

export const ChallengeShow: React.FC<
    IResourceComponentsProps<GetOneResponse<IChallenge>>
> = ({initialData}) => {

    const record = initialData?.data
    const [answer, setAnswer] = useState("")
    const {data: identity} = useGetIdentity();

    function RenderFiles(raw: any) {
        const uploadFiles = Convert.toUploadFiles(raw);
        return uploadFiles.map((v: UploadFiles, i: number, a: UploadFiles[]) => {
                return <><a href={v.url} download>
                    <button style={{margin: "2em"}}>Dowload file <Tag>{v.name}</Tag></button>
                </a></>
            }
        )
    }

    return (
        <Show title={record.name} headerButtons={({defaultButtons}) => (<>{}</>)}>
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
                        <Text>{record?.files ? <>
                            {
                                RenderFiles(record.files)
                            }
                        </> : "File not uploaded"}</Text>
                    </Col>
                </Row>

                <Title level={5}>Description</Title>
                <Text>
                    {record?.description}
                </Text>
            </Card>

            <Card style={{marginTop: "2em"}}>
                <Input placeholder="Flag(THIS_IS_FLAG)" name="inputFlag"
                       value={answer} onChange={(v) => {
                    setAnswer(v.target.value)
                }
                }>
                </Input>
                <Button style={{marginTop: "2em"}} onClick={() => {
                    if (record?.name && record.author_id && answer && identity && record.points && record.id) {
                        VerifyAnswer(record?.name!, record?.author_id!, answer, identity, record?.points!, record?.id!)
                            .then((r) => {
                                if (r) {
                                    notificationProvider.open({
                                        message: "Congrats, challenge solved",
                                        key: "challenge_success",
                                        type: "success"
                                    })
                                } else {
                                    notificationProvider.open({
                                        message: "Wrong answer, try again",
                                        key: "challenge_fail",
                                        type: "error"
                                    })
                                }
                            })
                            .catch((e) => {
                                console.log(e)
                                notificationProvider.open({
                                    message: "Error occurred, try again",
                                    key: "challenge_err",
                                    type: "error"
                                })
                            })
                    }
                }}>
                    SOLVE
                </Button>
            </Card>
        </Show>
    );
};

export async function VerifyAnswer(name: string, author: string, flag: string, identity: string, points: number, cid: string) {
    const encFlag = hashData(flag)
    const resp = await fetch('/api/vault/verify', {
        method: "POST",
        body: JSON.stringify({
            name, author, encFlag, identity, points, cid
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const datarsp = await resp.json()
    return datarsp.correct
}

export default ChallengeShow;

