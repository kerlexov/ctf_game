import React from "react";
import {AntdLayout, Row} from "@pankod/refine-antd";

export const HomeScreen: React.FC = () => {
    return (
        <AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <div>Welcome hacker!</div>
            </Row>
        </AntdLayout>
    );
};
export default HomeScreen;
