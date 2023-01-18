import {
    useForm,
    Create,
    Form,
    Select,
    Upload,
    Input, RcFile,
} from "@pankod/refine-antd";
import {IChallengeCreate} from "src/interfaces";
import {BUCKET_ID, encryptVault, hashData, mask, normalizeFile, resources, sec, storage} from "../../utility";
import {HttpError, IResourceComponentsProps, useGetIdentity, useNavigation} from "@pankod/refine-core";
import {Permission, Role} from "appwrite";


export const ChallengeCreate: React.FC<IResourceComponentsProps> = () => {
    const { goBack } = useNavigation();
    const {formProps, saveButtonProps} = useForm<IChallengeCreate,
        HttpError,
        IChallengeCreate>({
            action: "create",
            resource: resources.challenge,
            redirect: false,
            onMutationSuccess: () => goBack(),
            metaData: {
                writePermissions: [],
                readPermissions: [Permission.read(Role.users())],
            }
        },

);
    // const { selectProps: categorySelectProps } = useSelect<IChallengeCreate>({
    //     resource: "categories",
    // });
    const {data: identity} = useGetIdentity();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={(values) => {
                formProps.onFinish?.({
                    ...values,
                    files: JSON.stringify(values.files),
                    flag: "",
                    author_id: identity
                });

                Write(values.name, identity, values.flag).then(r =>{console.log(r)})
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
                                    let rcFile = file as RcFile;
                                    const {$id} = await storage.createFile(
                                        BUCKET_ID,
                                        rcFile.uid,
                                        rcFile,
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
                {/*<Form.Item label="Category" name="challangeCategoryID">*/}
                {/*    <Input />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Category" name={["category", "id"]}>*/}
                {/*    <Select {...categorySelectProps} />*/}
                {/*</Form.Item>*/}
            </Form>
        </Create>
    );
};

export async function Write(name: string, id: string, flag: string){
    const req = await fetch('/api/vault/create',{
        method: "POST",
        body: JSON.stringify({
          encFlag:hashData(flag),name,id:hashData(id)
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    const res = await req.json()
    if(res.success){
        console.log("uspio sejvat")
    }
    console.log(res)
}
export default ChallengeCreate;
