import {
	FC, useEffect, useState
} from "react";
import {Formik, FormikProps} from "formik";
import { footerSx } from "./InitTaskForm.sx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@libs/shared/firebaseconfig";
import dayjs from "dayjs";
import { InitTaskFormProps } from "./InitTaskForm.types";
import { OptionType, TaskTypeEnum } from "@lib/shared/types";
import { StatusTag } from "../../components/StatusTag";
import { useAuth } from "@lib/shared";
import {
	Button, Layout, Form, AutoComplete, Input, Typography, Select, Space, theme
} from "antd";

export const InitTaskForm:FC<InitTaskFormProps> = ({
	backlog,
	tasks,
	getTasks,
	getBacklog,
	closeModal
}) => {
	const me = useAuth();
	const [activeTask, setActiveTask] = useState("");

	const handleSubmit = () => async (values: {name: string, type: TaskTypeEnum}) => {
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
		}
	};

	const [processedTasks, setProcessedTasks] = useState<OptionType[]>([]);
	const [processedStatuses, setProcessedStatuses] = useState<OptionType[]>([]);
	const {useToken} = theme;
	const {token} = useToken();
	useEffect(
		() => {
			if (tasks) {
				setProcessedTasks(tasks.map((
					task, index
				) => ({
					value: task.name,
					label: task.name,
					key: index
				})));
			}
			setProcessedStatuses(Object.values(TaskTypeEnum).map((
				item, index
			) => ({
				value: item,
				label: item,
				key: index
			})));
		},
		[tasks]
	);

	const onSelectTask = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
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
		setProcessedTasks(tasks.map((
			task, index
		) => ({
			value: task.name,
			label: task.name,
			key: index
		})).filter(task => task.label.includes(data)));
	};

	const changeStatus = (setFieldValue: FormikProps<any>["setFieldValue"]) =>
		(val: string) => {
			setFieldValue(
				"status",
				val
			);
		};

	return (
    <Formik
      initialValues={{ name: "", type: TaskTypeEnum.DEFAULT }}
      validate={values => {
        const errors:Record<string, string> = {};
        if (!values.name) {
          errors["name"] = "Required";
        }
        return errors;
      }}
      onSubmit={handleSubmit()}
    >
      {({
          isSubmitting,
          setFieldValue,
          handleSubmit
        }) => (
        <Form
layout="vertical"
onFinish={handleSubmit}
        >
          <Form.Item
            colon={false}
            label={
              <Typography.Text>
                Task
              </Typography.Text>}
          >
            <AutoComplete
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
          <Form.Item
            colon={false}
            label={
              <Typography.Text>
                Status
              </Typography.Text>}
          >
            <Select
              onChange={changeStatus(setFieldValue)}
            >
                {processedStatuses.map(item => (
                  <Select.Option
key={item.key}
value={item.value}>
                    <Space style={{width: "fit-content"}}>
                      <StatusTag type={item.label as TaskTypeEnum}/>
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
        </Form>
      )}
    </Formik>
	);
};
