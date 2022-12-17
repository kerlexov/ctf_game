import {
    BaseRecord,
    GetOneResponse,
    IResourceComponentsProps,
    parseTableParamsFromQuery,
    useOne,
    useShow
} from "@pankod/refine-core";
import {Show, Typography, Tag, Button, Card, Input, Col, Row} from "@pankod/refine-antd";
import React from "react";
import {IChallenge, IFile, UploadFiles} from "../../interfaces";
import {customDataProvider, resources} from "../../utility";
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
                <Input placeholder="Flag(THIS_IS_FLAG)" name="inputFlag">

                </Input>
                <Button style={{marginTop:"2em"}}>
                    SOLVE
                </Button>

            </Card>
        </Show>
    );
};

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
