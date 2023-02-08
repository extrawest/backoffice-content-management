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
import { Button, Container, Form as SemanticForm, Grid, Header, Input, Select } from "semantic-ui-react";

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
        <Form style={{paddingTop: "8rem"}}>
          <Grid textAlign="center" centered>
            <Grid.Row centered>
              <Grid.Column width={6}>
                <Header as="h1" textAlign="center">
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
              <Grid.Column textAlign="center" width={6}>
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
              <Grid.Column textAlign="right" width={6}>
                <Link
                  to={AppRoutesEnum.REGISTRATION}
                  className="underline text-primary-main"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center" width={6}>
                <Header as="h5">
                  - Or continue with -
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center" width={3}>
                <Button
                  primary
                  circular
                  onClick={handleGoogleLogin}
                  icon
                >
                  <Google />
                </Button>
                <Button
                  primary
                  circular
                  onClick={handleFbLogin}
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
        </Form>)}
      </Formik>
	);
};
