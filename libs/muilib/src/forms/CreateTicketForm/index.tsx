import {
  ChangeEvent,
  FC, SyntheticEvent, useState
} from "react";
import { Form, Formik, FormikProps
} from "formik";
import {
	Autocomplete,
	Box,
	Button, FormControl, FormLabel, Grid, OutlinedInput, TextField, Typography
} from "@mui/material";
import {
  autocompleteSx, fileInputSx, footerSx, formLabel, imgBoxSx, imgSx, wrapperSx
} from "./CreateTicketForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@libs/shared/firebaseconfig";
import dayjs from "dayjs";
import { CreateTicketFormProps, FormValueProps } from "./CreateTicketForm.types";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import EmptyImage from "../../assets/images/emptyImage.png";
import { createTicketFormSchema } from "@lib/shared/types";
import { loaderSx } from "../EditTicketForm/EditTicketForm.sx";
import { Loader } from "@lib/muiapp";
import { useAuth } from "@lib/shared";

export const CreateTicketForm:FC<CreateTicketFormProps> = ({
	tasks,
  tickets,
	getTasks,
	closeModal,
  getTickets
}) => {
	const me = useAuth();
	const [activeTask, setActiveTask] = useState("");
  const [imgUrl, setImgUrl] = useState('');
  const formInit = {
    task: "",
    firstName: "",
    lastName: ""
  }
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [percentVal, setPercentVal] = useState(0)

  const getImage = (e: ChangeEvent) => {
    setDisableSubmit(true)
    const item = (e.target as HTMLInputElement)?.files?.[0];
    if (!item) return;

    const storageRef = ref(storage, `files/${item.name}`);
    const uploadTask = uploadBytesResumable(storageRef, item);
    uploadTask.on("state_changed",
      (snapshot) => {
        setPercentVal(Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (error) => {
        console.error('ERROR', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          setDisableSubmit(false)
        });
      })
  }

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
              image: imgUrl,
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
      initialValues={formInit}
      validateSchema={createTicketFormSchema}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          handleChange,
          errors,
          setFieldValue,
          handleSubmit,
        }:FormikProps<FormValueProps>) => (
        <Form onSubmit={handleSubmit}>
          <Box sx={wrapperSx}>
            <Box sx={imgBoxSx}>
               {disableSubmit &&
                  <Box sx={loaderSx}>
                    <Loader/>
                  </Box>
                }
                {!disableSubmit &&
                  <label>
                    <img
                      style={imgSx}
                      src={imgUrl ? imgUrl : EmptyImage}
                    />
                    <input
                      style={fileInputSx}
                      onChange={getImage}
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png, image/jpeg"
                    />
                  </label>
                }
            </Box>
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
          </Box>
          <Box
            sx={footerSx}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || disableSubmit}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
	);
};
