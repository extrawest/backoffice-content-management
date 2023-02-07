import {
  FC,
  SyntheticEvent,
  useState
} from "react";
import {
  Form, Formik, FormikHelpers, FormikProps
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { FormType, InitTaskFormProps } from "./InitTaskForm.types";
import { TaskTypeEnum } from "@lib/shared/types";
import { useAuth } from "../../../../shared/context";
import { DropdownProps, Form as SemanticForm, Grid, Header, Select } from "semantic-ui-react";

export const InitTaskForm:FC<InitTaskFormProps> = ({
  backlog,
  tasks,
  getTasks,
  getBacklog,
  closeModal
}) => {
  const me = useAuth();
	const [activeTask, setActiveTask] = useState("");
	const handleSubmit = () =>
    async (values: FormType, formikHelpers:  FormikHelpers<FormType>) => {
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
      getBacklog();
      closeModal();
      formikHelpers.resetForm();
    }
	};

	const processedTasks = backlog?.map(task => ({
		key: task.id,
    value: task.id,
		text: task.name
	}));

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
        "type",
        value
      );
    };

	const handleChangeTask = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(
      event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps
		) => {
			const value = data?.value as string ?? "";
			setFieldValue(
				"name",
				value
			);
			setActiveTask(value);
		};

	return (
    <Formik
      initialValues={{ name: "", type: TaskTypeEnum.DEFAULT }}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          setFieldValue
        }) => (
        <Form>
          <SemanticForm.Field width="16">
            <label>
              <Header as="h4">
                Task
              </Header>
              <Select
                fluid
                name="name"
                value={values["name"]}
                options={processedTasks}
                onChange={handleChangeTask(setFieldValue)}
              />
            </label>
          </SemanticForm.Field>
          <SemanticForm.Field width="16" >
            <label>
              <Header as="h4">
                Status
              </Header>
              <Select
                fluid
                name="type"
                value={values["type"]}
                options={processedStatuses}
                onChange={handleChangeStatus(setFieldValue)}
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
