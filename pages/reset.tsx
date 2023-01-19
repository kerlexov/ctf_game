import React, {useState} from "react";
import {Button, Card, Col, Form, Input, notificationProvider, Row, Typography} from "@pankod/refine-antd";
import {LayoutWrapper, useUpdatePassword} from "@pankod/refine-core";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";


const { Title } = Typography;
type updatePasswordVariables = {
    userId: string;
    password: string;
};
export const ResetPage: React.FC = (props, context) => {

    console.log(context)

    const [changeValue,setChangeValue] = useState("")
    return <>
        <Row>
            <Col span={12} >
                <Card
                    hoverable
                    style={{ width: "100%", height: "33vh",backgroundColor: "#3d2442", color: "#fff" }}
                >
                    <Form style={{marginTop:"3em",width: "80%"}}>
                        <Title style={{color:"white"}} level={5}>Password change</Title>
                        <Input minLength={8} maxLength={128} required type={"password"}  onChange={(c)=>{
                            setChangeValue(c.target.value)
                        }} placeholder="********" />

                        <Button style={{marginTop:"2em"}} onClick={(c)=>{
                            if(changeValue.length>8){

                                setChangeValue("")
                            }else {
                                notificationProvider.open({message:"Password must be at least 8 characters",key:"pchageea",type:"error"})
                            }
                        }
                        } type={"primary"}>Change password</Button>
                    </Form>
                </Card>
            </Col>
            <Col span={12} >

            </Col>
        </Row>
        <Row gutter={[2, 2]}>
            <Col span={12} >

            </Col>
            <Col span={12} >

            </Col>
        </Row></>
}
export const getServerSideProps:  GetServerSideProps = async (context) => {
    {
        return {
            props: {
                ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
            },
        }
    }
}

export default ResetPage;
