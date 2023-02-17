import {
	FC, useCallback, useEffect, useState 
} from "react";
import {Formik} from "formik";
import { Google, Facebook } from "@mui/icons-material";
import { auth } from "@libs/shared/firebaseconfig";
import { AppRoutesEnum } from "@lib/shared/types";
import {
	continueSx, socialsSx, submitBoxSx, titleSx, wrapperSx
} from "./LoginPage.sx";
import {
	Form, Input, Typography, Button, Row, Col, message
} from "antd";
import { Link } from "react-router-dom";
import {
	useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle 
} from "react-firebase-hooks/auth";
import { LoginFormTypes } from "./LoginPage.types";

export const LoginPage: FC = () => {
	const [api, context] = message.useMessage();
	
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
			setError("");
			signInWithGoogle();
		},
		[signInWithGoogle],
	);
	
	const handleSignInWithFacebook = useCallback(
		() => {
			setError("");
			signInWithFacebook();
		},
		[signInWithFacebook],
	);
	const handleSignInWithEmailAndPassword = useCallback(
		(values: LoginFormTypes) => {
			setError("");
			signInWithEmailAndPassword(
				values.email ?? "",
				values.password ?? ""
			);
		},
		[signInWithEmailAndPassword],
	);
	
	const [error, setError] = useState("");
	
	useEffect(
		() => {
			if (errorSignInWithFacebook || errorSignInWithGoogle || errorSignInWithEmailAndPassword) {
				setError(errorSignInWithFacebook?.message ??
					errorSignInWithGoogle?.message ??
					errorSignInWithEmailAndPassword?.message ??
					"");
			}
		},
		[errorSignInWithFacebook, errorSignInWithGoogle, errorSignInWithEmailAndPassword]
	);
	
	useEffect(
		() => {
			if (error) {
				api.error(error);
			}
		},
		[error]
	);

	return (
		<>
			{context}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSignInWithEmailAndPassword}
      >
        {({
            isSubmitting,
            values,
            handleChange,
											handleSubmit
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
                  onClick={handleSignInWithGoogle}
                  type="primary"
                >
                  <Google />
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ height: 50, width: 50 }}
                  onClick={handleSignInWithFacebook}
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
