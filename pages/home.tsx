import React from "react";
import {AntdLayout, Button, Card, Checkbox, Col, Form, Input, Row} from "@pankod/refine-antd";
import {useLogin} from "@pankod/refine-core";
import {ILoginForm} from "./login/login";
import CustomDocument from "./_document";

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
                <div>Wellcome hacker!</div>
            </Row>
        </AntdLayout>
    );
};
export default HomeScreen;
