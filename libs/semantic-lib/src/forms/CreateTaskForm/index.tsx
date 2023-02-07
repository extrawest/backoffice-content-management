import { FC } from "react";
import {
  Form, Formik, FormikHelpers
} from "formik";
import { Divider, Form as SemanticForm, Grid, Header, Input } from "semantic-ui-react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { CreateTaskFormProps } from "./CreateTaskForm.types";
import { useAuth } from "../../../../shared/context/Auth";

export const CreateTaskForm:FC<CreateTaskFormProps> = ({
  getBacklogData,
  closeModal,
  backlog
}) => {
  const me = useAuth()
	const handleSubmit = () => async (values: {name: string}, helpers: FormikHelpers<{name: string}>) => {
    try {
      if (me?.user?.uid) {
        await setDoc(doc(
          db, 'backlog', me?.user?.uid
        ), {
          tasks: [...backlog, {
            id: dayjs().valueOf().toString(),
            name: values.name
          }]
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      getBacklogData();
      closeModal();
      helpers.resetForm();
    }
	};

	return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={handleSubmit()}
    >
      {({
        isSubmitting,
        values,
        handleChange
      }) => (
        <Form>
          <SemanticForm.Field width="16">
            <label>
              <Header as="h4">
                Task
              </Header>
              <Input
                fluid
                name="name"
                value={values["name"]}
                onChange={handleChange}
              />
            </label>
          </SemanticForm.Field>
          <Grid padded="vertically">
            <Grid.Row>
              <Grid.Column textAlign="right">
                <SemanticForm.Button
                  primary
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
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
