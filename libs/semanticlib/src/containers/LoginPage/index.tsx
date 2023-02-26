import {
	FC, useCallback, useEffect, useState
} from "react";
import { Alert, Snackbar } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { auth } from "@lib/shared";
import { AppRoutesEnum } from "@lib/shared/types";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import {
	Button,
	Form as SemanticForm,
	Grid,
	Header,
	Input,
} from "semantic-ui-react";
import {
	useSignInWithEmailAndPassword,
	useSignInWithFacebook,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { LoginFormTypes } from "./LoginPage.types";

export const LoginPage: FC = () => {
	const [signInWithGoogle, , , errorSignInWithGoogle] =
		useSignInWithGoogle(auth);

	const [
		signInWithFacebook,
		,
		,
		errorSignInWithFacebook,
	] = useSignInWithFacebook(auth);

	const [
		signInWithEmailAndPassword,
		,
		,
		errorSignInWithEmailAndPassword,
	] = useSignInWithEmailAndPassword(auth);

	const handleSignInWithGoogle = useCallback(
		() => {
			setError("");
			signInWithGoogle();
		},
		[signInWithGoogle]
	);

	const handleSignInWithFacebook = useCallback(
		() => {
			setError("");
			signInWithFacebook();
		},
		[signInWithFacebook]
	);
	const handleSignInWithEmailAndPassword = useCallback(
		(values: LoginFormTypes) => {
			setError("");
			signInWithEmailAndPassword(
				values.email ?? "",
				values.password ?? ""
			);
		},
		[signInWithEmailAndPassword]
	);

	const [openAlert, setOpenAlert] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		() => {
			if (
				errorSignInWithFacebook ||
				errorSignInWithGoogle ||
				errorSignInWithEmailAndPassword
			) {
				setError(errorSignInWithFacebook?.message ??
					errorSignInWithGoogle?.message ??
					errorSignInWithEmailAndPassword?.message ??
					"");
			}
		},
		[
			errorSignInWithFacebook,
			errorSignInWithGoogle,
			errorSignInWithEmailAndPassword,
		]
	);

	useEffect(
		() => {
			if (error) {
				setOpenAlert(true);
			}
		},
		[error]
	);

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={handleSignInWithEmailAndPassword}
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
									Login to account
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
									Log In
								</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column
								textAlign="right"
								width={6}
							>
								<Link
									to={AppRoutesEnum.REGISTRATION}
									className="underline text-primary-main"
								>
									Don&amp;t have an account? Sign Up
								</Link>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column
								textAlign="center"
								width={6}
							>
								<Header as="h5">- Or continue with -</Header>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column
								textAlign="center"
								width={3}
							>
								<Button
									primary
									circular
									onClick={handleSignInWithGoogle}
									icon
								>
									<Google />
								</Button>
								<Button
									primary
									circular
									onClick={handleSignInWithFacebook}
									icon
								>
									<Facebook />
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Snackbar
						open={openAlert}
						onClose={() => setOpenAlert(false)}
						autoHideDuration={5000}
					>
						<Alert
							onClose={() => setOpenAlert(false)}
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
