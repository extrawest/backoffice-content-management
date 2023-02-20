import {
	FC, useEffect, useState
} from "react";
import {
	Formik, Form as FormikForm, FormikProps
} from "formik";
import { footerSx } from "./InitTaskForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@lib/shared";
import dayjs from "dayjs";
import { InitTaskFormProps } from "./InitTaskForm.types";
import { OptionType, TaskTypeEnum } from "@lib/shared/types";
import { StatusTag } from "../../components/StatusTag";
import { useAuth } from "@lib/shared";
import {
	Button,
	Layout,
	Form,
	AutoComplete,
	Input,
	Select,
	Space,
} from "antd";

export const InitTaskForm: FC<InitTaskFormProps> = ({
	backlog,
	tasks,
	getTasks,
	getBacklog,
	closeModal,
}) => {
	const me = useAuth();
	const [activeTask, setActiveTask] = useState("");

	const onSubmit =
		() => async (values: { name: string; type: TaskTypeEnum }) => {
			try {
				if (me.user?.uid) {
					await setDoc(
						doc(
							db,
							"tasks",
							me.user?.uid
						),
						{
							tasks: [
								...tasks,
								{
									id: dayjs().valueOf().toString(),
									name: backlog.find((task) => task.name === activeTask)?.name,
									type: values.type,
								},
							],
						}
					);
					await setDoc(
						doc(
							db,
							"backlog",
							me.user?.uid
						),
						{
							tasks: backlog.filter((task) => task.name !== activeTask),
						}
					);
				}
			} catch (error) {
				console.error(error);
			} finally {
				getTasks();
				getBacklog();
				closeModal();
			}
		};

	const [processedTasks, setProcessedTasks] = useState<OptionType[]>([]);
	const [processedStatuses, setProcessedStatuses] = useState<OptionType[]>([]);

	useEffect(
		() => {
			if (tasks) {
				setProcessedTasks(backlog.map((
					task, index
				) => ({
					value: task.name,
					label: task.name,
					key: index,
				})));
			}
			setProcessedStatuses(Object.values(TaskTypeEnum).map((
				item, index
			) => ({
				value: item,
				label: item,
				key: index,
			})));
		},
		[tasks]
	);

	const onSelectTask =
		(setFieldValue: FormikProps<unknown>["setFieldValue"]) =>
			(
				val: string, option: OptionType
			) => {
				setActiveTask(option.value);
				setFieldValue(
					"name",
					option.value
				);
			};

	const onSearchTask = (data: string) => {
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

	const changeStatus =
		(setFieldValue: FormikProps<unknown>["setFieldValue"]) => (val: string) => {
			setFieldValue(
				"type",
				val
			);
		};

	return (
		<Formik
			initialValues={{ name: "", type: TaskTypeEnum.DEFAULT }}
			onSubmit={onSubmit()}
		>
			{({ isSubmitting, setFieldValue, values, handleSubmit }) => (
				<FormikForm style={{ padding: "2rem 0" }}>
					<Form.Item colon={false}>
						<AutoComplete
							placeholder="Task"
							value={values["name"]}
							options={processedTasks}
							onSelect={onSelectTask(setFieldValue)}
							onSearch={onSearchTask}
						>
							<Input.Search
								size="large"
								enterButton
							/>
						</AutoComplete>
					</Form.Item>
					<Form.Item colon={false}>
						<Select
							placeholder="Status"
							onChange={changeStatus(setFieldValue)}
							value={values["type"]}
						>
							{processedStatuses.map((item) => (
								<Select.Option
									key={item.key}
									value={item.value}
								>
									<Space style={{ width: "fit-content" }}>
										<StatusTag type={item.label as TaskTypeEnum} />
									</Space>
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Layout.Footer style={footerSx}>
						<Button
							htmlType="submit"
							type="primary"
							disabled={isSubmitting}
						>
							Submit
						</Button>
					</Layout.Footer>
				</FormikForm>
			)}
		</Formik>
	);
};
