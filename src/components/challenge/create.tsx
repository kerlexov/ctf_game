import {
    useForm,
    useSelect,
    Create,
    Form,
    Select,
    Input,
} from "@pankod/refine-antd";
import { IChallengeCreate } from "src/interfaces";
export const ChallengeCreate: React.FC = () => {

    const { formProps, saveButtonProps } = useForm<IChallengeCreate>();

    // const { selectProps: categorySelectProps } = useSelect<IChallengeCreate>({
    //     resource: "categories",
    // });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical"  onFinish={(values) => {
                console.log(values);
            }}>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Points" name="points">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Flag" name="flag">
                    <Input />
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
                                value: "meduim",
                            },
                            {
                                label: "Easy",
                                value: "easy",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Category" name="challangeCategoryID">
                    <Input />
                </Form.Item>
                {/*<Form.Item label="Category" name={["category", "id"]}>*/}
                {/*    <Select {...categorySelectProps} />*/}
                {/*</Form.Item>*/}
            </Form>
        </Create>
    );
};
