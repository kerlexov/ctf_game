import {GetListResponse, IResourceComponentsProps, usePermissions} from "@pankod/refine-core";
import {DeleteButton, List, ShowButton, Space, Table, useTable} from "@pankod/refine-antd";
import {resources} from "../../utility";
import React from "react";
import {IChallenge} from "../../interfaces";

export const ChallengeList: React.FC<
    IResourceComponentsProps<GetListResponse<IChallenge>>
> = ({initialData}) => {
    const {tableProps} = useTable<IChallenge>({
        resource: resources.challenge,
        queryOptions: {
            initialData,
        },
    });

    const {data: permissionsData} = usePermissions();

    return (
        <List title="Challenges" canCreate={permissionsData?.includes("admin")}
              headerButtons={({defaultButtons}) => (<>{defaultButtons}</>)}>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Name"/>
                <Table.Column dataIndex="description" title="Description"/>
                <Table.Column dataIndex="points" title="Points"/>
                <Table.Column dataIndex="difficulty" title="Difficulty"/>
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
                                {
                                    permissionsData?.includes("admin") ? (<DeleteButton
                                        size="small"
                                        resourceNameOrRouteName={resources.challenge}
                                        recordItemId={record.id}
                                        mutationMode="undoable"
                                    />) : (<></>)
                                }

                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};

export default ChallengeList;
