import {
	FC, SyntheticEvent, useState
} from "react";
import {
	ErrorMessage, Form, Formik, FormikProps
} from "formik";
import {
  Autocomplete,
  Box,
  Button, FormControl, FormLabel, Grid, TextField, Typography
} from "@mui/material";
import { autocompleteSx, footerSx, formLabel } from "./InitTaskForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { TaskTypeEnum } from "../../types";
import { InitTaskFormProps } from "./InitTaskForm.types";

export const InitTaskForm:FC<InitTaskFormProps> = ({backlog}) => {
	const [activeTask, setActiveTask] = useState("");
	const handleSubmit = () => async (values: {name: string, type: TaskTypeEnum}) => {
		try {
			await setDoc(
				doc(
					db,
					"tasks",
					dayjs().valueOf().toString()
				),
				{
					id: dayjs().valueOf().toString(),
					name: values.name
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const processedTasks = backlog?.map(task => ({
		id: task.id,
		label: task.name
	}));

	const handleChangeTask = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(
			e: SyntheticEvent, newValue: {label: string, id: string} | null
		) => {
			const value = newValue?.id ?? "";
			setFieldValue(
				"name",
				value
			);
			setActiveTask(value);
		};

	return (
    <Formik
      initialValues={{ name: "", type: TaskTypeEnum.DEFAULT }}
      validate={values => {
        const errors:Record<string, string> = {};
        if (!values.name) {
          errors["name"] = "Required";
        }
        return errors;
      }}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          handleChange,
          errors,
          setFieldValue
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
                error={!!errors["name"]}
              >
                <FormLabel sx={formLabel}>
                  <Typography variant="caption">
                    Task
                  </Typography>
                </FormLabel>
                <Autocomplete
                  sx={autocompleteSx}
                  options={processedTasks}
                  selectOnFocus={false}
                  value={processedTasks.find(item => item.id === activeTask)}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      color="secondary"
                      variant="outlined"
                      placeholder="Select task"
                    />
                  )}
                  onChange={handleChangeTask(setFieldValue)}
                />
              </FormControl>
            </Grid>
            <Grid
              xs={12}
              item
            >

            </Grid>
          </Grid>
          <ErrorMessage
            name="name"
            component="div"
          />
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
