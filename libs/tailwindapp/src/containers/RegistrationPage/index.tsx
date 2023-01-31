import {
	FC, useState
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Snackbar
} from "@mui/material";
import { auth } from "../../../../shared/firebaseconfig";
import { AppRoutesEnum } from "@lib/shared/types";
import { Form, Formik } from "formik";

export const RegistrationPage: FC = () => {
	const [passwordCorrect, setPasswordCorrect] = useState(true);
	const navigate = useNavigate();
	const [openAlert, settOpenAlert] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = () => async (values: {email: string, password: string, confirm_password: string}) => {
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
						await	res.user.getIdToken().then((tokenRes) => {
								localStorage.setItem(
									"token",
									tokenRes ?? ""
								);
							})
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
              Registration
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
            <div className="mb-3 w-full">
              <input
                className="input"
                placeholder="Confirm password"
                name="confirm_password"
                type="password"
                value={values["confirm_password"]}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex mx-auto"
            >
              Sign up
            </button>
            <div className="flex justify-end my-2">
              <Link
                to={AppRoutesEnum.LOGIN}
                className="underline text-primary-main"
              >
                Already have an account? Sign in
              </Link>
            </div>
      </div>
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
        </Form>)}
    </Formik>
	);
};
