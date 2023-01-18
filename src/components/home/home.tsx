import React, {useEffect, useMemo, useState} from "react";
import {AntdLayout, Button, Row} from "@pankod/refine-antd";
import {ResultRecordData, ScoreboardProps} from "../../interfaces";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import {GetServerSideProps} from "next";
import {checkAuthentication} from "@pankod/refine-nextjs-router";
import {authProvider} from "../../authProvider";

export const HomeScreen: React.FC<ScoreboardProps> = (props, context) => {

    const columns = useMemo<MRT_ColumnDef<ResultRecordData>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'points',
                header: 'Points',
            }
        ],
        [],
    );

    const [data, setData] = useState<ResultRecordData[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{

        if(!loaded){
         fetch('/api/scoreboard', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=>{
            resp.json().then((fin)=>{
                setData(fin.data)
                setLoaded(true)
            })

         })
        }
    }, [data,loaded])

    return (
        <AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >

                {data&&loaded?(<MaterialReactTable
                    columns={columns}
                    data={data}
                    enableColumnActions={false}
                    enableColumnFilters={false}
                    enablePagination={false}
                    enableSorting={false}
                    enableBottomToolbar={false}
                    enableTopToolbar={false}
                    muiTableBodyRowProps={{ hover: false }}
                />):(<></>)}

            </Row>
        </AntdLayout>
    );
};

export const getServerSideProps:  GetServerSideProps<ScoreboardProps> = async (context) => {
        const { isAuthenticated, ...props } = await checkAuthentication(
            authProvider,
            context,
        );
        if (!isAuthenticated) {
            return props;
        }

        const resp = await fetch('/api/scoreboard', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const fin = await resp.json()

        return {
            props: {
                initialData: fin,
            },
        }
}
export default HomeScreen;
