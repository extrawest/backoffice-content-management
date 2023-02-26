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
		(values: LoginFormTypes): void => {
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
			{({ isSubmitting, values, handleChange }) => (
				<Form>
					<div className="mx-auto pt-8 w-auth">
						<h1 className="text-4xl text-center">Login to account</h1>
						<div className="mb-3 w-12">
							<input
								className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
								placeholder="Email address"
								name="email"
								type="email"
								value={values["email"]}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3 w-full">
							<input
								className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
								placeholder="Password"
								name="password"
								type="password"
								value={values["password"]}
								onChange={handleChange}
							/>
						</div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex mx-auto primary-btn-gradient py-3 px-6 cursor-pointer text-white uppercase border-none outline-none font-semibold border-round-3xl"
						>
							Log In
						</button>
						<div className="flex justify-content-end my-4">
							<Link
								to={AppRoutesEnum.REGISTRATION}
								className="underline text-primary-main"
							>
								Don&apos;t have an account? Sign Up
							</Link>
						</div>
						<p className="text-center mb-4">- Or continue with -</p>
						<div className="flex justify-content-center gap-3">
							<button
								className="primary-btn size-3 cursor-pointer text-white uppercase border-none outline-none font-semibold border-round-lg"
								onClick={handleSignInWithGoogle}
							>
								<Google />
							</button>
							<button
								className="primary-btn size-3 cursor-pointer text-white uppercase border-none outline-none font-semibold border-round-lg"
								onClick={handleSignInWithFacebook}
							>
								<Facebook />
							</button>
						</div>
					</div>
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
