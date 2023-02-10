import {
	ChangeEvent,
	FC, useState
} from "react";
import {
	Form, Formik, FormikProps
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@libs/shared/firebaseconfig";
import { EditTicketFormProps, FormValueProps } from "./EditTicketForm.types";
import {
	ref, getDownloadURL, uploadBytesResumable
} from "firebase/storage";
import EmptyImage from "../../assets/images/emptyImage.png";
import { useAuth } from "@lib/shared";
import { TaskTypeEnum } from "@lib/shared/types";
import { editTicketFormSchema } from "@lib/shared/types";
import { StatusTag } from "../../components/StatusTag";
import { Loader } from "@primelib";

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
								return ticket;
							} else {
								return ({
									...ticket,
									...values
								});
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

	const handleChangeStatus = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(e:  ChangeEvent<HTMLSelectElement>) => {
			const value = e.target?.value ?? "";
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
          errors,
          handleSubmit,
          setFieldValue
        }:FormikProps<FormValueProps>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="flex justify-content-center align-items-center">
              <div className="w-300">
                {disableSubmit &&
                  <div className="flex justify-center">
                    <Loader/>
                  </div>
                }
                {!disableSubmit &&
                  <label>
                    <img
                      className="upload-img-size"
                      src={imgUrl ? imgUrl : EmptyImage}
                    />
                    <input
                      className="hidden"
                      onChange={getImage}
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png, image/jpeg"
                    />
                  </label>
                }
              </div>
              <div className="w-form">
                <div className="mb-3">
                  <label>
                    <h4 className="text-sm font-normal mb-1">
                      Task
                    </h4>
                    <input
                      className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                      name="task"
                      value={values["task"]}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="mb-3 w-full">
                  <label>
                    <h4 className="text-sm font-normal mb-1">
                      Status
                    </h4>
                    <select
                      className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                      name="status"
                      value={values["status"]}
                      onChange={handleChangeStatus(setFieldValue)}
                    >
                      {processedStatuses.map(item => (
                        <option
key={item.id}
value={item.id}
                        >
                          <StatusTag type={item.name}/>
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mb-3">
                  <label>
                    <h4 className="text-sm font-normal mb-1">
                      First Name
                    </h4>
                    <input
                      className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                      name="firstName"
                      value={values["firstName"]}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label>
                    <h4 className="text-sm font-normal mb-1">
                      Last Name
                    </h4>
                    <input
                      className="p-2 w-12 border-1 border-round-3xl border-300 outline-0"
                      name="lastName"
                      value={values["lastName"]}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="py-2 flex justify-content-end">
              <button
                className="primary-btn-gradient py-2 px-4 cursor-pointer text-white uppercase border-none outline-none font-semibold border-round-3xl"
                type="submit"
                disabled={isSubmitting || disableSubmit}
              >
                Submit
              </button>
            </div>
          </Form>
        );
      } }
    </Formik>
	);
};
