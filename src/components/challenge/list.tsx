import {GetListResponse, IResourceComponentsProps, LayoutWrapper, parseTableParamsFromQuery} from "@pankod/refine-core";
import {useTable, List, Table, Space, EditButton, ShowButton, DeleteButton} from "@pankod/refine-antd";
import {appwriteClient, customDataProvider, options, resources} from "../../utility";
import {dataProvider} from "@pankod/refine-appwrite";
import {GetServerSideProps} from "next";
import React from "react";
import {IChallenge} from "../../interfaces";
import {checkAuthentication} from "@pankod/refine-nextjs-router";
import {authProvider} from "../../authProvider";

export const ChallengeList: React.FC<
    IResourceComponentsProps<GetListResponse<IChallenge>>
    > = ({ initialData }) => {
    const { tableProps } = useTable<IChallenge>({
        resource: resources.challenge,
        queryOptions: {
            initialData,
        },
        syncWithLocation: true,

    });

    return (
            <List title="Challenges">
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="name" title="Name" />
                    <Table.Column dataIndex="points" title="Points" />
                    <Table.Column dataIndex="description" title="Description" />
                    <Table.Column dataIndex="difficulty" title="Difficulty" />
                    <Table.Column<IChallenge>
                        title="Actions"
                        dataIndex="actions"
                        render={(_text, record): React.ReactNode => {
                            return (
                                <Space>
                                    <ShowButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <EditButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <DeleteButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
    );
};

export default ChallengeList;
