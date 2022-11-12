import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
} from "@pankod/refine-antd";

import { IChallenge, IChallengeCategory } from "interfaces";

export const ChallengesList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IChallenge>({
        initialSorter: [
            {
                field: "$id",
                order: "asc",
            },
        ],
    });
    //TODO category
    // const categoryIds =
    //     tableProps?.dataSource?.map((item:IChallenge) => item.challangeCategoryID) ?? [];
    // const { data, isLoading } = useMany<IChallengeCategory>({
    //     resource: "636fb38bee58eebbc29c",
    //     ids: categoryIds,
    //     queryOptions: {
    //         enabled: categoryIds.length > 0,
    //     },
    // });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column dataIndex="name" title="Name" sorter />
                <Table.Column dataIndex="points" title="Points" sorter />
                <Table.Column dataIndex="difficulty" title="Difficulty" sorter />

                {/*<Table.Column*/}
                {/*    dataIndex="challangeCategoryID"*/}
                {/*    title="Category"*/}
                {/*    render={(value) => {*/}
                {/*        if (isLoading) {*/}
                {/*            return <TextField value="Loading..." />;*/}
                {/*        }*/}

                {/*        return (*/}
                {/*            <TextField*/}
                {/*                value={*/}
                {/*                    data?.data.map((item) => {if(item.id === value) return item.title})*/}
                {/*                }*/}
                {/*            />*/}
                {/*        );*/}
                {/*    }}*/}
                {/*/>*/}
                <Table.Column<IChallenge>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
