import { useState } from "react";
import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
    RcFile,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IChallenge,
    IChallengeVariables,
    IChallengeCategory } from "interfaces";
import { normalizeFile, storage } from "utility";
import {FormControl, InputLabel, MenuItem} from "@pankod/refine-mui";

export const ChallengesCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<
        IChallenge,
        HttpError,
        IChallengeVariables
        >();

    // const { selectProps: categorySelectProps } = useSelect<IChallengeCategory>({
    //     resource: "61c43adc284ac",
    //     optionLabel: "title",
    //     optionValue: "id",
    // });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                //onFinish={(values) => {
                //     formProps.onFinish?.({
                //         ...values,
                //         images: JSON.stringify(values.images),
                //     });
                // }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Points"
                    name="points"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                    {/*<MDEditor data-color-mode="light" />*/}
                </Form.Item>
                <Form.Item
                    label="Difficulty"
                    name="difficulty"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                    >
                    <FormControl fullWidth>
                        <InputLabel id="difficulty-label"></InputLabel>
                        <Select
                            id="difficulty"
                        >
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                    </FormControl>                    {/*<MDEditor data-color-mode="light" />*/}
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
                <Form.Item
                    label="Flag"
                    name="flag"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                    {/*<MDEditor data-color-mode="light" />*/}
                </Form.Item>
                {/*TODO*/}
                {/*<Form.Item*/}
                {/*    label="Category"*/}
                {/*    name="categoryId"*/}
                {/*    rules={[*/}
                {/*        {*/}
                {/*            required: true,*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <Select {...categorySelectProps} />*/}
                {/*</Form.Item>*/}
                {/*TODO implement files
                <Form.Item label="Images">*/}
                {/*    <Form.Item*/}
                {/*        name="images"*/}
                {/*        valuePropName="fileList"*/}
                {/*        normalize={normalizeFile}*/}
                {/*        noStyle*/}
                {/*    >*/}
                {/*        <Upload.Dragger*/}
                {/*            name="file"*/}
                {/*            listType="picture"*/}
                {/*            multiple*/}
                {/*            customRequest={async ({*/}
                {/*                                      file,*/}
                {/*                                      onError,*/}
                {/*                                      onSuccess,*/}
                {/*                                  }) => {*/}
                {/*                try {*/}
                {/*                    const rcFile = file as RcFile;*/}

                {/*                    const { $id } = await storage.createFile(*/}
                {/*                        "default",*/}
                {/*                        rcFile.name,*/}
                {/*                        rcFile,*/}
                {/*                    );*/}

                {/*                    const url = storage.getFileView(*/}
                {/*                        "default",*/}
                {/*                        $id,*/}
                {/*                    );*/}

                {/*                    onSuccess?.({ url }, new XMLHttpRequest());*/}
                {/*                } catch (error) {*/}
                {/*                    onError?.(new Error("Upload Error"));*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <p className="ant-upload-text">*/}
                {/*                Drag &amp; drop a file in this area*/}
                {/*            </p>*/}
                {/*        </Upload.Dragger>*/}
                {/*    </Form.Item>*/}
                {/*</Form.Item>*/}
            </Form>
        </Create>
    );
};
