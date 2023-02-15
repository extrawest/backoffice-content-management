import {FC} from "react";
import {Formik} from "formik";
import { Google, Facebook } from "@mui/icons-material";
import {
	FacebookAuthProvider,
	getRedirectResult,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect
} from "firebase/auth";
import { auth, googleProvider } from "@libs/shared/firebaseconfig";
import { AppRoutesEnum } from "@lib/shared/types";
import {
	continueSx, socialsSx, submitBoxSx, titleSx, wrapperSx
} from "./LoginPage.sx";
import {
	Form, Input, Typography, Button, Row, Col, message
} from "antd";
import { LoginFormTypes } from "./LoginPage.types";
import { Link } from "react-router-dom";

export const LoginPage: FC = () => {
	const [api, context] = message.useMessage();

	const handleSubmit = () => async (values: LoginFormTypes) => {
		const value = {
			email:  values.email,
			password: values.password
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
			api.error(errorMessage);
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
				api.error(errorMessage);
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
				api.error(errorMessage);
			});
	};

	return (
		<>
			{context}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit()}
      >
        {({
            isSubmitting,
            values,
            handleChange
          }) => (
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
              label={
                <Typography.Text>
                  Email
                </Typography.Text>}
            >
              <Input
                name="email"
                value={values["email"]}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              colon={false}
              label={
                <Typography.Text>
                  Password
                </Typography.Text>}
            >
              <Input.Password
name="password"
value={values["password"]}
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
                  Log In
                </Button>
              </Row>
                <Row>
                  <Col span={12}></Col>
                  <Col span={12}>
                    <Link
                      to={AppRoutesEnum.REGISTRATION}
                    >
                      <Typography.Text>
                        Don&apos;t have an account? Sign Up
                      </Typography.Text>
                    </Link>
                  </Col>
                </Row>
                <Typography.Text style={continueSx}>- Or continue with -</Typography.Text>
            <Row
gutter={12}
style={socialsSx}
            >
              <Col>
                <Button
                  style={{ height: 50, width: 50 }}
                  onClick={handleGoogleLogin}
                  type="primary"
                >
                  <Google />
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ height: 50, width: 50 }}
                  onClick={handleFbLogin}
                  type="primary"
                >
                  <Facebook />
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
		</>
	);
};
