import {GetListResponse, IResourceComponentsProps, LayoutWrapper} from "@pankod/refine-core";
import {useTable, List, Table} from "@pankod/refine-antd";
import {appwriteClient, customDataProvider, options, resources} from "../../utility";
import {dataProvider} from "@pankod/refine-appwrite";
import {GetServerSideProps} from "next";
import React from "react";
import {IChallenge} from "../../interfaces";


// export const ChallengeList: React.FC<
//     IResourceComponentsProps<GetListResponse<IChallenge>>
//     > = ({ initialData }) => {
//     const { tableProps } = useTable<IChallenge>({
//     });
//
//     return (
//             <List title="Challenges">
//                 <Table {...tableProps} rowKey="id">
//                     <Table.Column dataIndex="name" title="Name" />
//                     <Table.Column dataIndex="points" title="Points" />
//                     <Table.Column dataIndex="difficulty" title="Difficulty" />
//                 </Table>
//             </List>
//     );
// };


export const ChallengeList: React.FC<
    IResourceComponentsProps<GetListResponse<IChallenge>>
    > = ({ initialData }) => {
    const { tableProps } = useTable<IChallenge>({
        resource: resources.challenge,
        queryOptions: {
            initialData,
        },
    });

    return (
            <List title="Challenges">
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="name" title="Name" />
                    <Table.Column dataIndex="points" title="Points" />
                    <Table.Column dataIndex="difficulty" title="Difficulty" />
                </Table>
            </List>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await customDataProvider.getList({
        resource: resources.challenge,
    });

    return {
        props: {initialData: data},
    };
};

export default ChallengeList;
