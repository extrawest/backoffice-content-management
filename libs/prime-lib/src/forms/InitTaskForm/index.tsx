import {
  ChangeEvent,
  FC,
  useState
} from "react";
import {
  Form, Formik, FormikHelpers, FormikProps, FormikValues
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { FormType, InitTaskFormProps } from "./InitTaskForm.types";
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
	const [activeTask, setActiveTask] = useState(backlog?.[0]?.id ?? "");

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
            tasks: backlog?.filter(task => task.id !== activeTask)
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
		id: task.id,
		label: task.name
	}));

  const processedStatuses = Object.values(TaskTypeEnum).map(item => ({
    id: item,
    name: item,
    value: item
  }))

  const handleChangeStatus = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
    (
      e:  ChangeEvent<HTMLSelectElement>
    ) => {
      const value = e.target?.value ?? "";
      setFieldValue(
        "type",
        value
      );
    };

	const handleChangeTask = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(
      e:  ChangeEvent<HTMLSelectElement>
		) => {
			const value = e.target?.value ?? "";
			setFieldValue(
				"name",
				value
			);
			setActiveTask(value);
		};

	return (
    <Formik
      initialValues={{ name: activeTask, type: TaskTypeEnum.DEFAULT }}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          values,
          setFieldValue
        }) => (
        <Form>
          <div className="flex flex-column align-items-center w-form pt-3">
            <div className="mb-3 w-12">
              <label>
                <h4 className="text-sm font-normal mb-1">
                  Task
                </h4>
                <select
                  className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                  name="name"
                  value={values["name"]}
                  onChange={handleChangeTask(setFieldValue)}
                >
                  {processedTasks.map(task => (
                    <option key={task.id} value={task.id}>{task.label}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mb-3 w-full">
              <label>
                <h4 className="text-sm font-normal mb-1">
                  Status
                </h4>
                <select
                  className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                  name="type"
                  value={values["type"]}
                  onChange={handleChangeStatus(setFieldValue)}
                >
                  {processedStatuses.map(item => (
                    <option key={item.id} value={item.id}>
                      <StatusTag type={item.name}/>
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="py-2 flex justify-content-end">
            <button
              className="primary-btn-gradient py-2 px-4 cursor-pointer text-white uppercase border-none outline-none font-semibold border-round-3xl"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
	);
};
