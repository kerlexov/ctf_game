import {
    BaseKey,
    GetListResponse,
    IResourceComponentsProps,
    LayoutWrapper,
    parseTableParamsFromQuery
} from "@pankod/refine-core";
import {useTable, List, Table, Space, EditButton, ShowButton, DeleteButton, Button} from "@pankod/refine-antd";
import {appwriteClient, customDataProvider, options, resources} from "../../utility";
import {dataProvider} from "@pankod/refine-appwrite";
import {GetServerSideProps} from "next";
import React from "react";
import {IChallenge} from "../../interfaces";
import {checkAuthentication} from "@pankod/refine-nextjs-router";
import {authProvider} from "../../authProvider";
import {Permission, Role} from "appwrite";

export const ChallengeList: React.FC<
    IResourceComponentsProps<GetListResponse<IChallenge>>
    > = ({ initialData }) => {
    const { tableProps } = useTable<IChallenge>({
        resource: resources.challenge,
        queryOptions: {
            initialData,
        },
        metaData: {
            writePermissions: [Permission.write(Role.users())],
            readPermissions: [Permission.read(Role.users())],
            updatePermission: [],
            deletePermission: [],
            // Permission.read(Role.any()),                  // Anyone can view this document
            // Permission.update(Role.team("writers")),      // Writers can update this document
            // Permission.update(Role.team("admin")),       // Admins can update this document
            // Permission.delete(Role.user("5c1f88b42259e"))
        }
    });

    return (
            <List title="Challenges" headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary" title="delete"
                            onClick={async () => {
                                const data = await customDataProvider.getList({
                                    resource: resources.challenge,
                                });
                                let ids: BaseKey[] = [];
                                data.data.forEach((value, index, array)=>{
                                    ids.push(value.id as BaseKey)
                                })

                                console.log(ids);
                                const res = await customDataProvider.deleteMany({resource: resources.challenge, ids})
                                console.log("briso")
                                console.log(res.data)
                            }}
                    >Delete all</Button>                </>
            )}

            >
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
                                        resourceNameOrRouteName={resources.challenge}
                                        recordItemId={record.id}
                                        mutationMode="undoable"
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
