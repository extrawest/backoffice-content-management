import {
  FC, FormEvent, useState
} from "react";
import {
	Alert,
	Box,
	Button,
	Grid,
	Link,
	Snackbar,
	TextField,
	Typography
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
import { submitBoxSx, titleSx, wrapperSx } from "./LoginPage.sx";
import { ButtonContained } from "../../components/ButtonContained";

export const LoginPage: FC = () => {
	const [openAlert, setOpenAlert] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const value = {
			email: data.get("email") as string,
			password: data.get("password") as string
		};
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
		<>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={wrapperSx}
      >
        <Typography
          variant="h2"
          sx={titleSx}
        >
          Login to account
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Box sx={submitBoxSx}>
          <ButtonContained
            type="submit"
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
              onClick={handleGoogleLogin}
              variant={"contained"}
            >
              <Google />
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ height: 50, width: 50 }}
              onClick={handleFbLogin}
              variant={"contained"}
            >
              <Facebook />
            </Button>
          </Grid>
        </Grid>
      </Box>
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
