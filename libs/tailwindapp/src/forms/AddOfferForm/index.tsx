import { FC } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { AddOfferFormProps, AddOfferValues } from "./AddOfferForm.types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import { useAuth } from "../../../../shared/context/Auth";

export const AddOfferForm:FC<AddOfferFormProps> = ({
	getOffers,
	closeModal
}) => {
	const me = useAuth();

	const handleSubmit = () => async (values: AddOfferValues, helper: FormikHelpers<AddOfferValues>) => {
		try {
			if (me?.user?.uid) {
				await addDoc(
					collection(
						db,
						"offers"
					),
						 {
						userId: me?.user?.uid,
						title: values.title,
						description: values.description
					}
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			getOffers();
			closeModal();
      helper.resetForm();
		}
	};

	return (
    <Formik
      initialValues={{ title: "", description: "" }}
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
                  Title
                </h4>
              </label>
              <input
                className="input"
                name="title"
                value={values["title"]}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 w-full">
              <label>
                <h4 className="sub-header mb-1">
                  Description
                </h4>
              </label>
              <input
                className="input"
                name="description"
                value={values["description"]}
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
