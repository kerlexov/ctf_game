import React, {useState} from "react";
import {Button, Card, Col, Form, Input, notificationProvider, Row, Typography} from "@pankod/refine-antd";
import {LayoutWrapper, useUpdatePassword} from "@pankod/refine-core";
import {authProvider} from "../src/authProvider";
import nookies from "nookies";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {ProfileProps} from "../src/interfaces";
import {hashData} from "../src/utility";
import {checkAuthentication} from "@pankod/refine-nextjs-router";


const { Title } = Typography;
type updatePasswordVariables = {
    userId: string;
    password: string;
};
export const ProfilePage: React.FC<ProfileProps> = (props, context) => {
    const { mutate: updatePassword } =
        useUpdatePassword<updatePasswordVariables>();

    const [changeValue,setChangeValue] = useState("")
    return <LayoutWrapper>
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
                                updatePassword({password:hashData(changeValue),userId:JSON.parse(props.identity)})
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
        </Row>

    </LayoutWrapper>
}
export const getServerSideProps:  GetServerSideProps = async (context) => {
    {
        const { isAuthenticated, ...props } = await checkAuthentication(
            authProvider,
            context,
        );
        if (!isAuthenticated) {
            return props;
        }

        const identity = nookies.get(context)["a"];

        return {
            props: {
                identity,
                ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
            },
        };
    }
    ;
}

export default ProfilePage;
