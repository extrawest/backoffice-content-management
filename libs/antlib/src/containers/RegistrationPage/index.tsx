import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@lib/shared";
import { AppRoutesEnum } from "@lib/shared/types";
import { Formik } from "formik";
import {
	Button, Col, Form, Input, message, Row, Typography
} from "antd";
import {
	submitBoxSx, titleSx, wrapperSx
} from "../LoginPage/LoginPage.sx";
import { RegistrationFormTypes } from "./RegistrationForm.types";

export const RegistrationPage: FC = () => {
	const [api, context] = message.useMessage();
	const navigate = useNavigate();

	const submissionHandler = () => async (values: RegistrationFormTypes) => {
		if (values.password === values.confirm_password && values?.email?.length) {
			try {
				await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				)
					.then(async (res) => {
						await res.user.getIdToken().then((tokenRes) => {
							localStorage.setItem(
								"token",
								tokenRes ?? ""
							);
						});
					})
					.then(() => {
						navigate("/");
					});
			} catch (err) {
				let errorMessage = "Failed to do something exceptional";
				if (err instanceof Error) {
					errorMessage = err.message;
				}
				api.error(errorMessage);
			}
		}
	};

	return (
		<>
			{context}
			<Formik
				initialValues={{ email: "", password: "", confirm_password: "" }}
				onSubmit={submissionHandler()}
			>
				{({ isSubmitting, values, handleChange, handleSubmit }) => (
					<Form
						layout="vertical"
						onFinish={handleSubmit}
						style={wrapperSx}
					>
						<Typography.Title
							level={1}
							style={titleSx}
						>
							Login to account
						</Typography.Title>
						<Form.Item
							colon={false}
							label={<Typography.Text>Email</Typography.Text>}
						>
							<Input
								name="email"
								value={values["email"]}
								onChange={handleChange}
							/>
						</Form.Item>
						<Form.Item
							colon={false}
							label={<Typography.Text>Password</Typography.Text>}
						>
							<Input.Password
								name="password"
								value={values["password"]}
								onChange={handleChange}
							/>
						</Form.Item>
						<Form.Item
							colon={false}
							label={<Typography.Text>Confirm Password</Typography.Text>}
						>
							<Input.Password
								name="confirm_password"
								value={values["confirm_password"]}
								onChange={handleChange}
							/>
						</Form.Item>
						<Row style={submitBoxSx}>
							<Button
								htmlType="submit"
								type="primary"
								shape="round"
								disabled={isSubmitting}
							>
								Sign Up
							</Button>
						</Row>
						<Row>
							<Col span={12}></Col>
							<Col span={12}>
								<Link to={AppRoutesEnum.LOGIN}>
									<Typography.Text>
										Already have an account? Sign in
									</Typography.Text>
								</Link>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
};
