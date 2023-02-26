import { FC } from "react";
import { Formik } from "formik";
import {
	footerSx, inputSx, submitBtnSx
} from "./CreateTaskForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@lib/shared";
import dayjs from "dayjs";
import { CreateTaskFormProps } from "./CreateTaskForm.types";
import { useAuth } from "@lib/shared";
import {
	Button, Form, Input, Layout, Typography
} from "antd";

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
	getBacklogData,
	closeModal,
	backlog,
}) => {
	const me = useAuth();
	const onSubmit = () => async (values: { name: string }) => {
		try {
			if (me?.user?.uid) {
				await setDoc(
					doc(
						db,
						"backlog",
						me?.user?.uid
					),
					{
						tasks: [
							...backlog,
							{
								id: dayjs().valueOf().toString(),
								name: values.name,
							},
						],
					}
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			getBacklogData();
			closeModal();
		}
	};

	return (
		<Formik
			initialValues={{ name: "" }}
			validate={(values) => {
				const errors: Record<string, string> = {};
				if (!values.name) {
					errors["name"] = "Required";
				}
				return errors;
			}}
			onSubmit={onSubmit()}
		>
			{({ isSubmitting, values, handleChange, handleSubmit }) => (
				<Form
					layout="vertical"
					onFinish={handleSubmit}
				>
					<Form.Item
						colon={false}
						label={<Typography.Text>Task</Typography.Text>}
					>
						<Input
							style={inputSx}
							value={values["name"]}
							onChange={handleChange}
							name="name"
						/>
					</Form.Item>
					<Layout.Footer style={footerSx}>
						<Button
							style={submitBtnSx}
							htmlType="submit"
							type="primary"
							size="large"
							disabled={isSubmitting}
						>
							Submit
						</Button>
					</Layout.Footer>
				</Form>
			)}
		</Formik>
	);
};
