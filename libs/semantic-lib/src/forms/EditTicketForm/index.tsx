import {
  ChangeEvent,
  FC, SyntheticEvent, useState
} from "react";
import {
  Form, Formik, FormikProps
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../../shared/firebaseconfig";
import { EditTicketFormProps, FormValueProps } from "./EditTicketForm.types";
import {
	ref, getDownloadURL, uploadBytesResumable
} from "firebase/storage";
import EmptyImage from "../../../../shared/assets/images/emptyImage.png";
import { useAuth } from "../../../../shared/context";
import { TaskTypeEnum } from "@lib/shared/types";
import { editTicketFormSchema } from "../../../../shared/types/src/lib/formData/EditTicketForm";
import { Loader } from "@libs/semantic";
import { DropdownProps, Form as SemanticForm, Grid, Header, Image, Input, Select } from "semantic-ui-react";

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
    key: item,
    text: item,
    value: item
  }))

  const handleChangeStatus = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
    (
      event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps
    ) => {
      const value = data?.value as string ?? "";
      setFieldValue(
        "status",
        value
      );
    };

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
          handleSubmit,
          setFieldValue
        }:FormikProps<FormValueProps>) => {
        return (
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
                      <Input
                        fluid
                        name="task"
                        value={values["task"]}
                        onChange={handleChange}
                      />
                    </label>
                  </SemanticForm.Field>
                  <SemanticForm.Field width="16">
                    <label>
                      <Header as="h4">
                        Status
                      </Header>
                      <Select
                        fluid
                        name="status"
                        value={values["status"]}
                        options={processedStatuses}
                        onChange={handleChangeStatus(setFieldValue)}
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
        )
      } }
    </Formik>
	);
};
