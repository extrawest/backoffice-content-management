import {
	FC, SyntheticEvent, useState
} from "react";
import {
	Form, Formik, FormikProps
} from "formik";
import {
  Autocomplete,
  Box,
  Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { autocompleteSx, footerSx, formLabel } from "./InitTaskForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { InitTaskFormProps } from "./InitTaskForm.types";
import { TaskTypeEnum } from "@lib/shared/types";
import { StatusTag } from "../../components/StatusTag";
import { useAuth } from "../../../../shared/context/Auth";

export const InitTaskForm:FC<InitTaskFormProps> = ({
  backlog,
  tasks,
  getTasks,
  getBacklog,
  closeModal
}) => {
  const me = useAuth();
	const [activeTask, setActiveTask] = useState("");
	const handleSubmit = () => async (values: {name: string, type: TaskTypeEnum}) => {
		try {
      if (me.user?.uid) {
        await setDoc(
          doc(
            db,
            "tasks",
            me.user?.uid
          ),
          {
            tasks: [...tasks, {
              id: dayjs().valueOf().toString(),
              name: backlog.find(task => task.id === activeTask)?.name,
              type: values.type
            }]
          }
        );
        await setDoc(
          doc(
            db,
            "backlog",
            me.user?.uid
          ),
          {
            tasks: backlog.filter(task => task.id !== activeTask)
          }
        );
      }
		} catch (error) {
			console.error(error);
		} finally {
      getTasks();
      getBacklog()
      closeModal()
    }
	};

	const processedTasks = backlog?.map(task => ({
		id: task.id,
		label: task.name
	}));

  const processedStatuses = Object.values(TaskTypeEnum).map(item => ({
    id: item,
    name: item,
    value: item
  }))

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
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors["name"]}
              >
                <FormLabel sx={formLabel}>
                  <Typography variant="caption">
                    Status
                  </Typography>
                </FormLabel>
                <Select
                  name='type'
                  onChange={handleChange}
                  defaultValue={processedStatuses[0].value}
                  value={values['type']}
                >
                  {processedStatuses.map((
                    item
                  ) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.value}
                        onClick={handleChange}
                      >
                        <StatusTag type={item.name}/>
                      </MenuItem>
                    )})}
                </Select>
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
