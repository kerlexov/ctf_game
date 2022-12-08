import {
    BaseRecord,
    GetOneResponse,
    IResourceComponentsProps,
    parseTableParamsFromQuery,
    useOne,
    useShow
} from "@pankod/refine-core";
import {Show, Typography, Tag, useTable} from "@pankod/refine-antd";
import React from "react";
import {IChallenge} from "../../interfaces";
import {customDataProvider, resources} from "../../utility";
import {GetServerSideProps} from "next";

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

    return (
        <Show>
            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Description</Title>
            <Text>
                <Tag>{record?.description}</Tag>
            </Text>

            <Title level={5}>Points</Title>
            <Text>{record?.points}</Text>
        </Show>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParamsFromQuery(context.query);

    console.log(parsedCurrent)
    console.log(parsedPageSize)
    console.log(parsedSorter)
    console.log(parsedFilters)
    const data = await customDataProvider.getOne({
        resource: resources.challenge,
        id: "1"
    });

    return {
        props: { initialData: data },
    };
};
