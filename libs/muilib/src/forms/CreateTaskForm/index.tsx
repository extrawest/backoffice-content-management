import { FC } from "react";
import { Form, Formik } from "formik";
import {
	Box, Button, FormControl, Grid, OutlinedInput
} from "@mui/material";
import { footerSx } from "./CreateTaskForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@lib/shared";
import dayjs from "dayjs";
import { CreateTaskFormProps } from "./CreateTaskForm.types";
import { useAuth } from "@lib/shared";

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
	getBacklogData,
	closeModal,
	backlog,
}) => {
	const me = useAuth();
	const onSubmit = () => async (values: { name: string }) => {
		try {
			if (me?.user?.uid) {
				await setDoc(
					doc(
						db,
						"backlog",
						me?.user?.uid
					),
					{
						tasks: [
							...backlog,
							{
								id: dayjs().valueOf().toString(),
								name: values.name,
							},
						],
					}
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			getBacklogData();
			closeModal();
		}
	};

	return (
		<Formik
			initialValues={{ name: "" }}
			validate={(values) => {
				const errors: Record<string, string> = {};
				if (!values.name) {
					errors["name"] = "Required";
				}
				return errors;
			}}
			onSubmit={onSubmit()}
		>
			{({ isSubmitting, values, handleChange, errors, handleSubmit }) => (
				<Form>
					<Grid
						container
						spacing={2}
					>
						<Grid
							xs={12}
							item
						>
							<FormControl
								fullWidth
								variant="outlined"
								margin="normal"
								error={!!errors["name"]}
							>
								<OutlinedInput
									type="text"
									name="name"
									value={values["name"]}
									onChange={handleChange}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Box sx={footerSx}>
						<Button
							type="submit"
							variant="contained"
							disabled={isSubmitting}
						>
							Submit
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};
