import {Create, Form, Input, notificationProvider, RcFile, Select, Upload, useForm,} from "@pankod/refine-antd";
import {IChallengeCreate} from "src/interfaces";
import {BUCKET_ID, hashData, normalizeFile, resources, storage} from "../../utility";
import {HttpError, IResourceComponentsProps, useGetIdentity, useNavigation, usePermissions} from "@pankod/refine-core";
import {Permission, Role} from "appwrite";


export const ChallengeCreate: React.FC<IResourceComponentsProps> = () => {
    const {goBack} = useNavigation();
    const {formProps, saveButtonProps} = useForm<IChallengeCreate,
        HttpError,
        IChallengeCreate>(
        {
            action: "create",
            resource: resources.challenge,
            redirect: false,
            onMutationSuccess: () => goBack(),
        });
    const {data: identity} = useGetIdentity();
    const {data: permissionsData} = usePermissions();
    if(!permissionsData?.includes("admin")){
        goBack()
    }

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={async (values) => {
                const writeRes = await Write(values.name, identity, values.flag, values)
                if (writeRes) {
                    notificationProvider.open({
                        message: "Challenge created",
                        key: "challenge_create_success",
                        type: "success"
                    })
                    goBack()
                } else {
                    notificationProvider.open({
                        message: "Failed to create challenge",
                        key: "challenge_create_fail",
                        type: "error"
                    })
                    goBack()
                }
            }}>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Points" name="points">
                    <Input/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input/>
                </Form.Item>
                <Form.Item label="Flag" name="flag">
                    <Input/>
                </Form.Item>
                <Form.Item label="Difficulty" name="difficulty">
                    <Select
                        options={[
                            {
                                label: "Hard",
                                value: "hard",
                            },
                            {
                                label: "Medium",
                                value: "medium",
                            },
                            {
                                label: "Easy",
                                value: "easy",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Files">
                    <Form.Item
                        name="files"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                        required={true}
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                                      file,
                                                      onError,
                                                      onSuccess,
                                                  }) => {
                                try {
                                    const rcFile = file as RcFile;
                                    const {$id} = await storage.createFile(
                                        BUCKET_ID,
                                        rcFile.uid,
                                        rcFile,
                                        [Permission.read(Role.any()), Permission.write(Role.team("admin", "admin"))]
                                    );

                                    const url = storage.getFileView(
                                        BUCKET_ID,
                                        $id,
                                    );
                                    onSuccess?.({url}, new XMLHttpRequest());
                                } catch (error) {
                                    onError?.(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag &amp; drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};

export async function Write(name: string, id: string, flag: string, values: IChallengeCreate) {
    const [isWritten] = await Promise.all([fetch('/api/vault/create', {
        method: "POST",
        body: JSON.stringify({
            encFlag: hashData(flag), name, id: hashData(id), values
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (req) => {
        return await req.json().then((res) => {
            if (res.success) {
                return true
            } else {
                return false
            }
        }).catch((e) => {
            console.log(e)
            return false
        })
    })])

    return isWritten
}

export default ChallengeCreate;
