import {
	FC, FormEvent, useState 
} from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
	Alert,
	Box,
	Grid,
	Link,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { auth } from "@lib/shared";
import { AppRoutesEnum } from "@lib/shared/types";
import { wrapperSx } from "./RegisterPage.sx";
import { titleSx } from "../LoginPage/LoginPage.sx";
import { ButtonContained } from "../../components/ButtonContained";

export const RegistrationPage: FC = () => {
	const [passwordCorrect, setPasswordCorrect] = useState(true);
	const navigate = useNavigate();
	const [openAlert, settOpenAlert] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const values = {
			email: data.get("email") as string,
			password: data.get("password") as string,
			confirm_password: data.get("confirm_password"),
		};

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
				settOpenAlert(true);
				setError(errorMessage);
			}
		} else {
			setPasswordCorrect(false);
		}
	};

	return (
		<>
      <Box
component="form"
noValidate
onSubmit={handleSubmit}
sx={wrapperSx}
      >
        <Typography
variant="h2"
sx={titleSx}
        >
          Registration
        </Typography>
        <Grid
container
spacing={2}
        >
          <Grid
item
xs={12}
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid
item
xs={12}
          >
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </Grid>
          <Grid
item
xs={12}
          >
            <TextField
              required
              fullWidth
              name="confirm_password"
              label="Confirm password"
              type="password"
              id="confirm_password"
              error={!passwordCorrect}
              helperText={
                passwordCorrect ? "" : "Please make sure your passwords match"
              }
            />
          </Grid>
        </Grid>
        <Box my={3}>
          <ButtonContained
type="submit"
fullWidth
          >
            Sign up
          </ButtonContained>
        </Box>
        <Grid
container
justifyContent="flex-end"
        >
          <Grid item>
            <Link
href={AppRoutesEnum.LOGIN}
variant="body2"
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
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
		</>
	);
};
