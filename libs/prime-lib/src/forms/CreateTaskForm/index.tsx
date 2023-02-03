import { FC } from "react";
import {
  Form, Formik, FormikHelpers
} from "formik";
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
          <div className="flex flex-column align-items-center w-form pt-3">
            <div className="mb-3 w-12">
              <label>
                <h4 className="text-sm font-normal mb-1">
                  Task
                </h4>
              </label>
              <input
                className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                name="name"
                value={values["name"]}
                onChange={handleChange}
              />
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
