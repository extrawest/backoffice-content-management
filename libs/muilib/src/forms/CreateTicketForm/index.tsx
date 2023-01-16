import {
	FC, SyntheticEvent, useState
} from "react";
import {
	ErrorMessage, Form, Formik, FormikProps
} from "formik";
import {
	Autocomplete,
	Box,
	Button, FormControl, FormLabel, Grid, OutlinedInput, TextField, Typography
} from "@mui/material";
import {
	autocompleteSx, footerSx, formLabel
} from "./CreateTicketForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { CreateTicketFormProps, FormValueProps } from "./CreateTicketForm.types";
import { useAuth } from "@lib/muiapp";

export const CreateTicketForm:FC<CreateTicketFormProps> = ({
	tasks,
  tickets,
	getTasks,
	closeModal,
  getTickets
}) => {
	const me = useAuth();
	const [activeTask, setActiveTask] = useState("");
	const handleSubmit = () => async (values: FormValueProps) => {
		try {
			if (me.user?.uid) {
				await setDoc(
					doc(
						db,
						"tickets",
						me.user?.uid
					),
					{
						data: [...tickets, {
							id: dayjs().valueOf().toString(),
							task: tasks.find(task => task.id === activeTask)?.name,
							firstName: values.firstName,
							lastName: values.lastName,
              status: tasks.find(task => task.id === activeTask)?.type
						}]
					}
				);
				await setDoc(
					doc(
						db,
						"tasks",
						me.user?.uid
					),
					{
						tasks: tasks.filter(task => task.id !== activeTask)
					}
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			getTasks();
      getTickets();
			closeModal();
		}
	};

	const processedTasks = tasks?.map(task => ({
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
      initialValues={{ task: "", firstName: "", lastName: "" }}
      // validate={createTicketFormSchema}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          handleChange,
          errors,
          setFieldValue,
          handleSubmit
        }:FormikProps<FormValueProps>) => (
        <Form onSubmit={handleSubmit}>
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
                error={!!errors["task"]}
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
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors["firstName"]}
              >
                <FormLabel sx={formLabel}>
                  <Typography variant="caption">
                    First Name
                  </Typography>
                </FormLabel>
                  <OutlinedInput
                    type="text"
                    name="firstName"
                    value={values["firstName"]}
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
                error={!!errors["lastName"]}
              >
                <FormLabel sx={formLabel}>
                  <Typography variant="caption">
                    Last Name
                  </Typography>
                </FormLabel>
                <OutlinedInput
                  type="text"
                  name="lastName"
                  value={values["lastName"]}
                  onChange={handleChange}
                />
              </FormControl>
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
