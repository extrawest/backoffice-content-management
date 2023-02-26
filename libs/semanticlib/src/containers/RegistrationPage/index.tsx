import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, Snackbar } from "@mui/material";
import { auth } from "@lib/shared";
import { AppRoutesEnum } from "@lib/shared/types";
import { Form, Formik } from "formik";
import {
	Button,
	Form as SemanticForm,
	Grid,
	Header,
	Input,
} from "semantic-ui-react";

export const RegistrationPage: FC = () => {
	const [, setPasswordCorrect] = useState(true);
	const navigate = useNavigate();
	const [openAlert, settOpenAlert] = useState(false);
	const [error, setError] = useState("");

	const onSubmit =
		() =>
			async (values: {
				email: string;
				password: string;
				confirm_password: string;
			}) => {
				if (
					values.password === values.confirm_password &&
					values?.email?.length
				) {
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
						settOpenAlert(true);
						setError(errorMessage);
					}
				} else {
					setPasswordCorrect(false);
				}
			};

	return (
		<Formik
			initialValues={{ email: "", password: "", confirm_password: "" }}
			onSubmit={onSubmit()}
		>
			{({ isSubmitting, values, handleChange, handleSubmit }) => (
				<Form style={{ paddingTop: "8rem" }}>
					<Grid
						textAlign="center"
						centered
					>
						<Grid.Row centered>
							<Grid.Column width={6}>
								<Header
									as="h1"
									textAlign="center"
								>
									Registration
								</Header>
								<SemanticForm.Field width="16">
									<label>
										<Input
											fluid
											type="email"
											name="email"
											placeholder="Email address"
											value={values["email"]}
											onChange={handleChange}
										/>
									</label>
								</SemanticForm.Field>
								<SemanticForm.Field width="16">
									<label>
										<Input
											fluid
											type="password"
											name="password"
											placeholder="Password"
											value={values["password"]}
											onChange={handleChange}
										/>
									</label>
								</SemanticForm.Field>
								<SemanticForm.Field width="16">
									<label>
										<Input
											fluid
											type="password"
											name="confirm_password"
											placeholder="Confirm password"
											value={values["confirm_password"]}
											onChange={handleChange}
										/>
									</label>
								</SemanticForm.Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid centered>
						<Grid.Row>
							<Grid.Column
								textAlign="center"
								width={6}
							>
								<Button
									primary
									disabled={isSubmitting}
									type="submit"
									size="large"
									circular
								>
									Sign up
								</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column
								textAlign="right"
								width={6}
							>
								<Link
									to={AppRoutesEnum.LOGIN}
									className="underline text-primary-main"
								>
									Already have an account? Sign in
								</Link>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Snackbar
						open={openAlert}
						onClose={() => settOpenAlert(false)}
						autoHideDuration={5000}
					>
						<Alert
							onClose={() => settOpenAlert(false)}
							severity="error"
							sx={{ width: "100%" }}
						>
							{`Something went wrong... ${error}`}
						</Alert>
					</Snackbar>
				</Form>
			)}
		</Formik>
	);
};
