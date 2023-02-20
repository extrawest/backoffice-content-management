import {
	ChangeEvent, FC, useEffect, useState
} from "react";
import {
	Formik, Form as FormikForm, FormikProps
} from "formik";
import dayjs from "dayjs";
import {
	AutoComplete, Button, Col, Form, Input, Layout, Row
} from "antd";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@lib/shared";
import {
	ref, getDownloadURL, uploadBytesResumable
} from "firebase/storage";
import { useAuth } from "@lib/shared";
import {
	CreateTicketFormProps,
	FormValueProps,
} from "./CreateTicketForm.types";
import {
	fileInputSx,
	footerSx,
	imgBoxSx,
	imgSx,
	inputSx,
	submitBtnSx,
	wrapperSx,
} from "./CreateTicketForm.sx";
import EmptyImage from "../../assets/images/emptyImage.png";
import { createTicketFormSchema, OptionType } from "@lib/shared/types";

export const CreateTicketForm: FC<CreateTicketFormProps> = ({
	tasks,
	tickets,
	getTasks,
	closeModal,
	getTickets,
}) => {
	const me = useAuth();
	const [activeTask, setActiveTask] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const formInit = {
		task: "",
		firstName: "",
		lastName: "",
	};
	const [disableSubmit, setDisableSubmit] = useState(false);
	const [, setPercentVal] = useState(0);

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
						data: [
							...tickets,
							{
								id: dayjs().valueOf().toString(),
								task: tasks.find((task) => task.name === activeTask)?.name,
								firstName: values.firstName,
								lastName: values.lastName,
								image: imgUrl,
								status: tasks.find((task) => task.name === activeTask)?.type,
							},
						],
					}
				);
				await setDoc(
					doc(
						db,
						"tasks",
						me.user?.uid
					),
					{
						tasks: tasks.filter((task) => task.name !== activeTask),
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

	const [processedTasks, setProcessedTasks] = useState<OptionType[]>([]);

	useEffect(
		() => {
			if (tasks) {
				setProcessedTasks(tasks.map((
					task, index
				) => ({
					value: task.name,
					label: task.name,
					key: index,
				})));
			}
		},
		[tasks]
	);

	const onSelect =
		(setFieldValue: FormikProps<unknown>["setFieldValue"]) =>
			(
				val: string, option: OptionType
			) => {
				setActiveTask(option.value);
				setFieldValue(
					"task",
					option.value
				);
			};

	const onSearch = (data: string) => {
		setProcessedTasks(tasks
			.map((
				task, index
			) => ({
				value: task.name,
				label: task.name,
				key: index,
			}))
			.filter((task) => task.label.includes(data)));
	};

	return (
		<Formik
			initialValues={formInit}
			validationSchema={createTicketFormSchema}
			onSubmit={onSubmit()}
		>
			{({
				isSubmitting,
				values,
				errors,
				handleChange,
				setFieldValue,
				handleSubmit
			}: FormikProps<FormValueProps>) => (
				<FormikForm style={{ padding: "2rem 0" }}>
					<Row
						gutter={24}
						style={wrapperSx}
					>
						<Col
							span={6}
							style={imgBoxSx}
						>
							<label>
								<img
									style={imgSx}
									src={imgUrl ? imgUrl : EmptyImage}
									alt=""
								/>
								<input
									style={fileInputSx}
									onChange={getImage}
									type="file"
									id="image"
									name="image"
									accept="image/png, image/jpeg"
								/>
							</label>
						</Col>
						<Col span={18}>
							<Form.Item colon={false}>
								<AutoComplete
									placeholder="Task"
									options={processedTasks}
									onSelect={onSelect(setFieldValue)}
									onSearch={onSearch}
								>
									<Input.Search
										style={inputSx}
										size="large"
										enterButton
									/>
								</AutoComplete>
							</Form.Item>
							<Form.Item colon={false}>
								<Input
									placeholder="First Name"
									style={inputSx}
									value={values["firstName"]}
									onChange={handleChange}
									name="firstName"
								/>
							</Form.Item>
							<Form.Item colon={false}>
								<Input
									placeholder="Last Name"
									style={inputSx}
									value={values["lastName"]}
									onChange={handleChange}
									name="lastName"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Layout.Footer style={footerSx}>
						<Button
							style={submitBtnSx}
							htmlType="submit"
							type="primary"
							size="large"
							disabled={isSubmitting || disableSubmit}
						>
							Submit
						</Button>
					</Layout.Footer>
				</FormikForm>
			)}
		</Formik>
	);
};
