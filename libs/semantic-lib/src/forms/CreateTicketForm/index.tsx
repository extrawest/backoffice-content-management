import {
  ChangeEvent,
  FC, SyntheticEvent,
  useState
} from "react";
import {
  Form, Formik, FormikHelpers, FormikProps
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@libs/shared/firebaseconfig";
import dayjs from "dayjs";
import { CreateTicketFormProps, FormValueProps } from "./CreateTicketForm.types";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import EmptyImage from "../../assets/images/emptyImage.png";
import { createTicketFormSchema } from "@lib/shared/types";
import { Loader } from "@libs/semantic";
import { Grid, Header, Image, Form as SemanticForm, Input, Select, DropdownProps } from "semantic-ui-react";
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

  const handleSubmit = () => async (values: FormValueProps, helpers: FormikHelpers<FormValueProps>) => {
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
      helpers.resetForm();
      setImgUrl('')
		}
	};

	const processedTasks = tasks?.map(task => ({
		key: task.id,
		value: task.id,
		text: task.name
	}));

	const handleChangeTask = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(
      event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps
		) => {
      const value = data?.value as string ?? "";
			setFieldValue(
				"task",
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
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={4}>
                {disableSubmit &&
                  <div className="flex justify-center">
                    <Loader/>
                  </div>
                }
                {!disableSubmit &&
                  <label>
                    <Image
                      src={imgUrl ? imgUrl : EmptyImage}
                      size="small"
                    />
                    <input
                      style={{display: "none"}}
                      onChange={getImage}
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png, image/jpeg"
                    />
                  </label>
                }
              </Grid.Column>
              <Grid.Column width={12}>
                <SemanticForm.Field width="16">
                  <label>
                    <Header as="h4">
                      Task
                    </Header>
                    <Select
                      fluid
                      name="task"
                      value={values["task"]}
                      options={processedTasks}
                      onChange={handleChangeTask(setFieldValue)}
                    />
                  </label>
                </SemanticForm.Field>
                <SemanticForm.Field width="16">
                  <label>
                    <Header as="h4">
                      First Name
                    </Header>
                    <Input
                      fluid
                      name="firstName"
                      value={values["firstName"]}
                      onChange={handleChange}
                    />
                  </label>
                </SemanticForm.Field>
                <SemanticForm.Field width="16">
                  <label>
                    <Header as="h4">
                      Last Name
                    </Header>
                    <Input
                      fluid
                      name="lastName"
                      value={values["lastName"]}
                      onChange={handleChange}
                    />
                  </label>
                </SemanticForm.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded="vertically">
            <Grid.Row>
              <Grid.Column textAlign="right">
                <SemanticForm.Button
                  primary
                  type="submit"
                  size="large"
                  disabled={isSubmitting || disableSubmit}
                >
                  Submit
                </SemanticForm.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    </Formik>
	);
};
