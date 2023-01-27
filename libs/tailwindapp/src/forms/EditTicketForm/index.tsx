import {
	ChangeEvent,
	FC, useState
} from "react";
import {
	Form, Formik, FormikProps, ErrorMessage
} from "formik";
import {
  Box,
  Button, FormControl, FormHelperText, FormLabel, Grid, MenuItem, OutlinedInput, Select, Typography
} from "@mui/material";
import {
  fileInputSx, footerSx, formLabel, imgBoxSx, imgSx, loaderSx, wrapperSx
} from "./EditTicketForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../../shared/firebaseconfig";
import { EditTicketFormProps, FormValueProps } from "./EditTicketForm.types";
import {
	ref, getDownloadURL, uploadBytesResumable
} from "firebase/storage";
import EmptyImage from "../../../../shared/assets/images/emptyImage.png";
import { useAuth } from "../../../../shared/context/Auth";
import { TaskTypeEnum } from "@lib/shared/types";
import { editTicketFormSchema } from "../../../../shared/types/src/lib/formData/EditTicketForm";
import { StatusTag } from "../../components/StatusTag";
import { Loader } from "@lib/tailwind";

export const EditTicketForm:FC<EditTicketFormProps> = ({
	tickets,
	closeModal,
	getTickets,
	init
}) => {
	const me = useAuth();
	const [imgUrl, setImgUrl] = useState(init?.image ?? "");
	const formInit: FormValueProps = {
		task: init.task,
		firstName: init.firstName,
		lastName: init.lastName,
		image: init?.image ?? "",
		status: init.status
	};

	const [disableSubmit, setDisableSubmit] = useState(false);
	const [percentVal, setPercentVal] = useState(0);

	const getImage = (e: ChangeEvent) => {
		setDisableSubmit(true);
		const item = (e.target as HTMLInputElement)?.files?.[0];
		if (!item) return;

		const storageRef = ref(
			storage,
			`files/${item.name}`
		);
		const uploadTask = uploadBytesResumable(
			storageRef,
			item
		);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				setPercentVal(Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
			},
			(error) => {
				console.error(
					"ERROR",
					error
				);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImgUrl(downloadURL);
					setDisableSubmit(false);
				});
			}
		);
	};

	const onSubmit = () => async (values: FormValueProps) => {
		try {
      if (me.user?.uid) {
        await setDoc(
          doc(
            db,
            "tickets",
            me.user?.uid
          ),
          {
            data: tickets.map(ticket => {
              if (ticket.id !== init.id) {
                return ticket
              } else {
                return ({
                  ...ticket,
                  ...values
                })
              }
            })
          }
        );
      }
		} catch (error) {
			console.error(error);
		} finally {
			getTickets();
			closeModal();
		}
	};

	const processedStatuses = Object.values(TaskTypeEnum).map(item => ({
		id: item,
		name: item,
		value: item
	}));

	return (
    <Formik
      initialValues={formInit}
      validateSchema={editTicketFormSchema}
      onSubmit={onSubmit()}
    >
      {({
          isSubmitting,
          values,
          handleChange,
          errors,
          handleSubmit
        }:FormikProps<FormValueProps>) => {
        return (
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
                    <OutlinedInput
                      type="text"
                      name="task"
                      value={values["task"]}
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
                    error={!!errors["status"]}
                  >
                    <FormLabel sx={formLabel}>
                      <Typography variant="caption">
                        Status
                      </Typography>
                    </FormLabel>
                    <Select
                      name='status'
                      onChange={handleChange}
                      value={values["status"]}
                    >
                      {processedStatuses.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.value}
                            onClick={handleChange}
                          >
                            <StatusTag type={item.name}/>
                          </MenuItem>
                        );})}
                    </Select>
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
                    <ErrorMessage
                      name="lastName"
                      render={(msg) => <FormHelperText>{msg}</FormHelperText>}
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
                Update
              </Button>
            </Box>
          </Form>
        )
      } }
    </Formik>
	);
};
