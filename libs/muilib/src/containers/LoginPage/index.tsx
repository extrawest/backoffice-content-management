import {
  FC, useCallback, useEffect, useState
} from "react";
import {
	Alert,
	Box,
	Button,
  FormControl,
	Grid,
	Link,
	Snackbar,
	TextField,
	Typography
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { auth } from "@libs/shared/firebaseconfig";
import { AppRoutesEnum } from "@lib/shared/types";
import { submitBoxSx, titleSx, wrapperSx } from "./LoginPage.sx";
import { ButtonContained } from "../../components/ButtonContained";
import { Form, Formik } from "formik";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { LoginFormTypes } from "../../../../antlib/src/containers/LoginPage/LoginPage.types";

export const LoginPage: FC = () => {
  const [
    signInWithGoogle, ,
    loadingSignInWithGoogle,
    errorSignInWithGoogle
  ] = useSignInWithGoogle(auth);

  const [
    signInWithFacebook, ,
    loadingSignInWithFacebook,
    errorSignInWithFacebook
  ] = useSignInWithFacebook(auth);

  const [
    signInWithEmailAndPassword, ,
    loadingSignInWithEmailAndPassword,
    errorSignInWithEmailAndPassword
  ] = useSignInWithEmailAndPassword(auth);

  const handleSignInWithGoogle = useCallback(
    () => {
      setError('');
      signInWithGoogle();
    },
    [signInWithGoogle],
  );

  const handleSignInWithFacebook = useCallback(
    () => {
      setError('');
      signInWithFacebook();
    },
    [signInWithFacebook],
  );
  const handleSignInWithEmailAndPassword = useCallback(
    (values: LoginFormTypes) => {
      setError('');
      signInWithEmailAndPassword(values.email ?? "", values.password ?? "");
    },
    [signInWithEmailAndPassword],
  );

  const [openAlert, setOpenAlert] = useState(false);
	const [error, setError] = useState("");

  useEffect(() => {
      if (errorSignInWithFacebook || errorSignInWithGoogle || errorSignInWithEmailAndPassword) {
        setError(
          errorSignInWithFacebook?.message ??
          errorSignInWithGoogle?.message ??
          errorSignInWithEmailAndPassword?.message ??
          ''
        )
      }
    },
    [errorSignInWithFacebook, errorSignInWithGoogle, errorSignInWithEmailAndPassword])

  useEffect(() => {
    if (error) {
      setOpenAlert(true)
    }
  }, [error])

	return (
		<>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSignInWithEmailAndPassword}
      >
        {({
            isSubmitting,
            values,
            handleChange
          }) => (
          <Form>
            <Box
              sx={wrapperSx}
            >
              <Typography
                variant="h2"
                sx={titleSx}
              >
                Login to account
              </Typography>
              <FormControl>
                <TextField
                  required
                  fullWidth
                  value={values["email"]}
                  onChange={handleChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  fullWidth
                  value={values["password"]}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <Box sx={submitBoxSx}>
                <ButtonContained
                  type="submit"
                  // disabled={
                  //   loadingSignInWithEmailAndPassword ||
                  //   loadingSignInWithFacebook ||
                  //   loadingSignInWithGoogle
                  // }
                  fullWidth
                >
                  Log In
                </ButtonContained>
              </Box>
              <Grid
                container
                justifyContent="flex-end"
              >
                <Grid item>
                  <Link
                    href={AppRoutesEnum.REGISTRATION}
                    variant="body2"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Grid
                sx={{ py: 2 }}
                container
                justifyContent="center"
              >
                <Grid item>
                  <Typography>- Or continue with -</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{ py: 2 }}
                spacing={2}
              >
                <Grid item>
                  <Button
                    sx={{ height: 50, width: 50 }}
                    onClick={handleSignInWithGoogle}
                    variant={"contained"}
                  >
                    <Google />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ height: 50, width: 50 }}
                    onClick={handleSignInWithFacebook}
                    variant={"contained"}
                  >
                    <Facebook />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
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
		</>
	);
};
