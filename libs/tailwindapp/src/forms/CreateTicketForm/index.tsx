import {
  ChangeEvent,
  FC,
  useState
} from "react";
import { Form, Formik, FormikProps
} from "formik";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../../shared/firebaseconfig";
import dayjs from "dayjs";
import { CreateTicketFormProps, FormValueProps } from "./CreateTicketForm.types";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import EmptyImage from "../../../../shared/assets/images/emptyImage.png";
import { useAuth } from "../../../../shared/context/Auth";
import { createTicketFormSchema } from "@lib/shared/types";
import { Loader } from "@lib/tailwind";

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

  const handleSubmit = () => async (values: FormValueProps) => {
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
		}
	};

	const processedTasks = tasks?.map(task => ({
		id: task.id,
		label: task.name
	}));

	const handleChangeTask = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(
			e:  ChangeEvent<HTMLSelectElement>
		) => {
			const value = e?.target?.value ?? "";
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
          <div className="flex justify-center items-center">
            <div className="w-300">
               {disableSubmit &&
                  <div className="flex justify-center">
                    <Loader/>
                  </div>
                }
                {!disableSubmit &&
                  <label>
                    <img
                      className="w-img h-img block object-cover"
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
                    <h4 className="sub-header mb-1">
                      Task
                    </h4>
                    <select
                      className="input"
                      name="task"
                      value={values["task"]}
                      onChange={handleChangeTask(setFieldValue)}
                    >
                      {processedTasks.map(task => (
                        <option key={task.id} value={task.id}>{task.label}</option>
                      ))}
                    </select>
                  </label>
              </div>
              <div className="mb-3">
                <label>
                  <h4 className="sub-header mb-1">
                    First Name
                  </h4>
                  <input
                    className="input"
                    name="firstName"
                    value={values["firstName"]}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  <h4 className="sub-header mb-1">
                    Last Name
                  </h4>
                  <input
                    className="input"
                    name="lastName"
                    value={values["lastName"]}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="py-2 flex justify-end">
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting || disableSubmit}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
	);
};
