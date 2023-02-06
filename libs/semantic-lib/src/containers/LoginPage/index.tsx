import {
  FC, useState
} from "react";
import {
	Alert,
	Snackbar
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import {
	FacebookAuthProvider,
	getRedirectResult,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect
} from "firebase/auth";
import { auth, googleProvider } from "../../../../shared/firebaseconfig";
import { AppRoutesEnum } from "@lib/shared/types";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

export const LoginPage: FC = () => {
	const [openAlert, setOpenAlert] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = () => async (value: {email: string, password: string}) => {
		try {
			await signInWithEmailAndPassword(
				auth,
				value.email,
				value.password
			).then(async (result) => {

				let token = "";
				await result.user.getIdToken().then((tokenRes) => {
					token = tokenRes;
				});
				localStorage.setItem(
					"token",
					token ?? ""
				);
			});
		} catch (err) {
			let errorMessage = "Failed to do something exceptional";
			if (err instanceof Error) {
				errorMessage = err.message;
			}
			setOpenAlert(true);
			setError(errorMessage);
		}
	};

	const handleGoogleLogin = () => {
		signInWithRedirect(
			auth,
			googleProvider
		);
		getRedirectResult(auth)
			.then((result) => {
				if (result) {
					const credential =
            GoogleAuthProvider.credentialFromResult(result);
					const token = credential?.accessToken;
					localStorage.setItem(
						"token",
						token ?? ""
					);
				}
			})
			.catch((err) => {
				const errorMessage = err.message;
				setOpenAlert(true);
				setError(errorMessage);
			});
	};

	const handleFbLogin = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(
			auth,
			provider
		)
			.then((result) => {
				const user = result.user;
				const credential =
          FacebookAuthProvider.credentialFromResult(result);
				const accessToken = credential?.accessToken;
				localStorage.setItem(
					"token",
					accessToken ?? ""
				);
			})
			.catch((err) => {
				const errorMessage = err.message;
				setOpenAlert(true);
				setError(errorMessage);
			});
	};

	return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          handleChange
        }) => (
        <Form>
      <div className="mx-auto pt-10 w-auth">
        <h1 className="header-main text-center">
          Login to account
        </h1>
        <div className="mb-3 w-full">
          <input
            className="input"
            placeholder="Email address"
            name="email"
            type="email"
            value={values["email"]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 w-full">
          <input
            className="input"
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
          className="btn-primary flex mx-auto"
        >
          Log In
        </button>
        <div className="flex justify-end my-2">
          <Link
            to={AppRoutesEnum.REGISTRATION}
            className="underline text-primary-main"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
        <p className="text-center mb-4">- Or continue with -</p>
        <div className="flex justify-center gap-3">
          <button
            className="btn-primary-icon"
            onClick={handleGoogleLogin}
          >
            <Google />
          </button>
          <button
            className="btn-primary-icon"
            onClick={handleFbLogin}
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
        </Form>)}
      </Formik>
	);
};
