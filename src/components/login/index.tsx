import React, {CSSProperties, useState} from "react";
import {useAuthenticated, useForgotPassword, useLogin, useNavigation, useRegister,} from "@pankod/refine-core";
import {
    AntdLayout,
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    notificationProvider,
    Row,
    Spin,
    Typography,
    useModal,
} from "@pankod/refine-antd";
import {ILoginForm, IRegisterForm} from "../../interfaces";
import {emailExpression, hashData} from "../../utility";
import {LoadingOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const titleStyles: CSSProperties = {
    textAlign: "center",
    color: "#626262",
    fontSize: "24px",
    letterSpacing: "-0.04em",
    overflowWrap: "break-word",
    hyphens: "manual",
    textOverflow: "unset",
    whiteSpace: "pre-wrap",
};
type forgotPasswordVariables = {
    email: string;
};
export const LoginScreen: React.FC = () => {
    const CreateAcc = (
        <Title level={3} style={titleStyles}>
            Create account
        </Title>
    );
    const LoginAcc = (
        <Title level={3} style={titleStyles}>
            One step closer
        </Title>
    );
    const [loginForm] = Form.useForm<ILoginForm>();
    const {
        mutate: login,
        isSuccess: isLoginSuccess
    } = useLogin<ILoginForm>();
    const [isLogin, setIsLogin] = useState(true);

    const [registerDone, setRegisterDone] = useState(false);
    const [registerForm] = Form.useForm<IRegisterForm>();
    const {
        mutate: register,
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess
    } = useRegister<IRegisterForm>();

    const {isSuccess, isLoading} = useAuthenticated();
    const {list} = useNavigation()
    const {modalProps, show, close} = useModal();
    const [forgotEmail, setForgotEmail] = useState("")
    const {mutate: forgotPassword} =
        useForgotPassword<forgotPasswordVariables>();


    if (isRegisterSuccess && registerDone) {
        notificationProvider.open({message: "Register successful", key: "regis", type: "success"})
        setIsLogin(true)
        setRegisterDone(false)
    }
    if (isLoginSuccess || isSuccess) {
        notificationProvider.open({message: "Login successful", key: "logis", type: "success"})
        list("challenge")
    }

    if (!isLoading) {
        return (<AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                    width: "100vw",
                    transform: "translate(0%,0%)",
                }}
            >
                <Col xs={22} md={21} lg={18} xl={16}>
                    <div className="container">
                        {
                            isLogin ? RenderLogin() : RenderRegister()
                        }
                    </div>
                </Col>
            </Row>
        </AntdLayout>);
    } else {
        return (<><Spin indicator={antIcon}/></>)
    }

    function RenderLogin() {
        return (
            <Card title={LoginAcc} headStyle={{borderBottom: 0}}>
                <Form<ILoginForm>
                    layout="vertical"
                    form={loginForm}
                    onFinish={(values) => {
                        login({email: values.email, password: hashData(values.password), remember: values.remember})
                    }}
                    requiredMark={true}
                    initialValues={{
                        remember: false,
                    }
                    }
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, type: "email", message: "Invalid email address"}]}
                    >
                        <Input size="large" placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{required: true}]}
                        style={{marginBottom: "12px"}}
                    >
                        <Input
                            type="password"
                            placeholder="●●●●●●●●"
                            size="large"
                        />
                    </Form.Item>
                    <div style={{marginBottom: "12px"}}>
                        <a
                            style={{
                                float: "right",
                                fontSize: "12px",
                            }}
                            onClick={() => {
                                show()
                            }
                            }
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Modal onOk={close} okButtonProps={{hidden: true}}
                           cancelButtonProps={{hidden: true}} {...modalProps}>
                        <Form style={{marginTop: "3em", width: "80%"}}>
                            <Title style={{color: "black"}} level={5}>Email password recovery</Title>
                            <Input required type={"email"} onChange={(c) => {
                                setForgotEmail(c.target.value)
                            }} placeholder="Email"/>

                            <Button style={{marginTop: "2em"}} onClick={() => {
                                if (emailExpression.test(forgotEmail)) {
                                    forgotPassword({email: forgotEmail})
                                    setForgotEmail("")
                                    close()
                                } else {
                                    notificationProvider.open({
                                        message: "Enter a valid email",
                                        key: "validemaile",
                                        type: "error"
                                    })
                                    setForgotEmail("")
                                }
                            }
                            } type={"primary"}>Request password change</Button>
                        </Form>
                    </Modal>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        block
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </Form>
                <div style={{marginTop: 8}}>
                    <Text style={{fontSize: 12}}>
                        Don’t have an account?{" "}
                        <a style={{fontWeight: "bold"}} onClick={() => {
                            setIsLogin(false);
                        }}>
                            Create account
                        </a>
                    </Text>
                </div>
            </Card>
        )
    }

    function RenderRegister() {
        return (<Card title={CreateAcc} headStyle={{borderBottom: 0}}>
                <Form<IRegisterForm>
                    layout="vertical"
                    form={registerForm}
                    onFinish={(values) => {
                        if (!registerDone) {
                            register({
                                create_email: values.create_email,
                                create_password: hashData(values.create_password),
                                create_name: values.create_name
                            })
                            setRegisterDone(true)
                        }
                    }}
                    requiredMark={true}
                    initialValues={{
                        remember: true,
                    }}
                > <Form.Item
                    name="create_name"
                    label="Name"
                    rules={[{required: true, type: "string"}]}
                >
                    <Input size="large" placeholder="Name"/>
                </Form.Item>
                    <Form.Item
                        name="create_email"
                        label="Email"
                        rules={[{required: true, type: "email", message: "Invalid email address"}]}
                    >
                        <Input size="large" placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="create_password"
                        label="Password"
                        rules={[{required: true}]}
                        style={{marginBottom: "3em"}}
                    >
                        <Input
                            type="password"
                            placeholder="●●●●●●●●"
                            size="large"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        block
                        loading={isRegisterLoading}
                    >
                        Register
                    </Button>
                </Form>
                <div style={{marginTop: 8}}>
                    <Text style={{fontSize: 12}}>
                        Have an account?{" "}
                        <a style={{fontWeight: "bold"}} onClick={() => {
                            setIsLogin(true);
                        }}>
                            Log in account
                        </a>
                    </Text>
                </div>
            </Card>
        )
    }
};
export default LoginScreen;
