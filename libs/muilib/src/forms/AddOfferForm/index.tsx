import { FC } from "react";
import { Form, Formik } from "formik";
import {
	Box, Button, FormControl, FormLabel, Grid, OutlinedInput, Typography
} from "@mui/material";
import { footerSx } from "../CreateTaskForm/CreateTaskForm.sx";
import { AddOfferFormProps, AddOfferValues } from "./AddOfferForm.types";
import { formLabel } from "../CreateTicketForm/CreateTicketForm.sx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@libs/shared/firebaseconfig";
import { useAuth } from "@lib/shared";

export const AddOfferForm:FC<AddOfferFormProps> = ({
	getOffers,
	closeModal
}) => {
	const me = useAuth();

	const handleSubmit = () => async (values: AddOfferValues) => {
		try {
			if (me?.user?.uid) {
				await addDoc(
					collection(
						db,
						"offers"
					),
						 {
						userId: me?.user?.uid,
						title: values.title,
						description: values.description
					}
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			getOffers();
			closeModal();
		}
	};

	return (
    <Formik
      initialValues={{ title: "", description: "" }}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          handleChange,
          errors
        }) => (
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
                error={!!errors["title"]}
              >
                <FormLabel sx={formLabel}>
                  <Typography variant="caption">
                    Title
                  </Typography>
                </FormLabel>
                <OutlinedInput
                  type="text"
                  name="title"
                  value={values["title"]}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid
              xs={12}
              item
            >
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors["description"]}
              >
                <FormLabel sx={formLabel}>
                  <Typography variant="caption">
                    Description
                  </Typography>
                </FormLabel>
                <OutlinedInput
                  type="text"
                  name="description"
                  value={values["description"]}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box
            sx={footerSx}
          >
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
