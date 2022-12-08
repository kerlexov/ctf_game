import {
    useForm,
    Create,
    Form,
    Select,
    Upload,
    Input, RcFile,
} from "@pankod/refine-antd";
import {IChallengeCreate} from "src/interfaces";
import {BUCKET_ID, encryptVault, hashData, normalizeFile, resources, sec, storage} from "../../utility";
import {HttpError, IResourceComponentsProps, useGetIdentity, useNavigation} from "@pankod/refine-core";

export const ChallengeCreate: React.FC<IResourceComponentsProps> = () => {
    const {list} = useNavigation();
    const {formProps, saveButtonProps} = useForm<IChallengeCreate,
        HttpError,
        IChallengeCreate>({
            action: "create",
            resource: resources.challenge,
            onMutationSuccess: (data) => {
                list("challenge")
            }
        }
    );
    // const { selectProps: categorySelectProps } = useSelect<IChallengeCreate>({
    //     resource: "categories",
    // });
    const {data: identity} = useGetIdentity();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={(values) => {
                const f = hashData(values.name+"_"+sec+"_"+identity);
                formProps.onFinish?.({
                    ...values,
                    files: JSON.stringify(values.files),
                    flag: f,
                    author_id: identity
                });

                Write(values.name, identity, values.flag,f).then(r =>{console.log(r)})
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
                                        rcFile.name,
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

export async function Write(name: string,author: string,flag:string,salt: string){
    const encFlag = encryptVault({vault:flag,vaultKey: salt})
    const resp = await fetch('/api/vault',{
        method: "POST",
        body: JSON.stringify({
           name,author,encFlag,
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    const datarsp = await resp.json()
    console.log(datarsp)
}
export default ChallengeCreate;
