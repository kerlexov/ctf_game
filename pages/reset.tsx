import React, {useState} from "react";
import {Button, Card, Col, Form, Input, notificationProvider, Row, Typography} from "@pankod/refine-antd";
import {useRouter} from "next/router";
import {hashData} from "../src/utility";
const {Title} = Typography;
export const ResetPage: React.FC = (props, context) => {
    const router = useRouter()
    const url1 = new URL(`https://ctf-game.vercel.app${router.query.to}`);
    let u;
    let s;
    url1.searchParams.forEach((value, key, parent) => {
        if (key === "userId") {
            u = value;
        }
        if (key === "secret") {
            s = value;
        }
    })

    const [changeValue, setChangeValue] = useState("")
    return <>
        {u && s ? (<Row style={{height: "100vh"}}>
            <Col span={12}>
                <Card
                    hoverable
                    style={{width: "100%", height: "100%", backgroundColor: "#3d2442", color: "#fff"}}
                >
                    <Form style={{marginTop: "3em", width: "80%"}}>
                        <Title style={{color: "white"}} level={5}>Password change</Title>
                        <Input minLength={8} maxLength={128} required type={"password"} value={changeValue}
                               onChange={(c) => {
                                   setChangeValue(c.target.value)
                               }} placeholder="********"/>
                        <Button style={{marginTop: "2em"}} onClick={async (c) => {
                            if (changeValue.length > 8) {
                                const resp = await fetch('/api/user/validateForgot', {
                                    method: "POST",
                                    body: JSON.stringify({
                                        u, s, p: hashData(changeValue)
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                const datarsp = await resp.json()
                                if (datarsp.success) {
                                    notificationProvider.open({
                                        message: "Password changed",
                                        key: "pchageea",
                                        type: "success"
                                    })
                                } else {
                                    notificationProvider.open({
                                        message: "Failed to change password",
                                        key: "pchageeas",
                                        type: "error"
                                    })
                                }
                                setChangeValue("")
                                setTimeout(() => {
                                    window.location.href = "https://ctf-game.vercel.app"
                                }, 420)
                            } else {
                                notificationProvider.open({
                                    message: "Password must be at least 8 characters",
                                    key: "pchageea",
                                    type: "error"
                                })
                                setChangeValue("")
                            }
                        }
                        } type={"primary"}>Change password</Button>
                    </Form>
                </Card>
            </Col>
        </Row>) : (<></>)}
    </>
}
export default ResetPage;
