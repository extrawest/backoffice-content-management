import { FC } from "react";
import {
	Form, Formik, FormikHelpers
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@libs/shared/firebaseconfig";
import dayjs from "dayjs";
import { CreateTaskFormProps } from "./CreateTaskForm.types";
import { useAuth } from "@lib/shared";

export const CreateTaskForm:FC<CreateTaskFormProps> = ({
	getBacklogData,
	closeModal,
	backlog
}) => {
	const me = useAuth();
	const handleSubmit = () => async (
		values: {name: string}, helpers: FormikHelpers<{name: string}>
	) => {
		try {
			if (me?.user?.uid) {
				await setDoc(
					doc(
						db,
						"backlog",
						me?.user?.uid
					),
					{
						tasks: [...backlog, {
							id: dayjs().valueOf().toString(),
							name: values.name
						}]
					}
				);
			}
		} catch (error) {
			console.error(error);
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
          <div className="flex flex-col items-center w-form pt-3">
            <div className="mb-3 w-full">
              <label>
                <h4 className="sub-header mb-1">
                  Task
                </h4>
              </label>
              <input
                className="input"
                name="name"
                value={values["name"]}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="py-2 flex justify-end">
            <button
              className="btn-primary"
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
