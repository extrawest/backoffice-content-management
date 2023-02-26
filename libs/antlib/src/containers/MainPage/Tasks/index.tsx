import { FC, useState } from "react";
import {
	Button, Layout, Row, Space, theme, Typography
} from "antd";
import { Modal } from "../../../common";
import { InitTaskForm } from "../../../forms";
import { StatusTag } from "../../../components/StatusTag";
import { TasksProps } from "./Tasks.types";
import {
	addSx, boxSx, headerStackSx, subTextSx, taskRowSx
} from "./Tasks.sx";

export const Tasks: FC<TasksProps> = ({
	backlog,
	tasks,
	getBacklog,
	getTasks,
}) => {
	const { useToken } = theme;
	const { token } = useToken();

	const [showModal, setShowModal] = useState(false);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	return (
		<Layout.Content style={boxSx(token)}>
			<Space style={headerStackSx}>
				<Typography.Title
					level={3}
					style={{ margin: 0 }}
				>
					Tasks
				</Typography.Title>
				<Typography.Text>View details</Typography.Text>
			</Space>
			<Space style={headerStackSx}>
				<Typography.Text style={subTextSx(token)}>
					Create new task
				</Typography.Text>
				<Button
					shape="circle"
					type="text"
					onClick={handleShowModal(true)}
					style={addSx(token)}
				>
					+
				</Button>
			</Space>
			{!!tasks?.length && (
				<Space
					direction="vertical"
					style={{ width: "100%" }}
				>
					{tasks.map((
						task, i
					) => (
						<Row
							key={i}
							style={taskRowSx(
								i < tasks?.length - 1,
								token
							)}
						>
							<Typography.Title level={4}>{task?.name}</Typography.Title>
							<StatusTag type={task.type} />
						</Row>
					))}
				</Space>
			)}
			{!tasks?.length && (
				<Typography.Title level={4}>No tasks yet...</Typography.Title>
			)}
			<Modal
				onCancel={handleShowModal(false)}
				open={showModal}
				title="Start task"
			>
				<InitTaskForm
					backlog={backlog}
					tasks={tasks}
					getTasks={getTasks}
					getBacklog={getBacklog}
					closeModal={handleShowModal(false)}
				/>
			</Modal>
		</Layout.Content>
	);
};
