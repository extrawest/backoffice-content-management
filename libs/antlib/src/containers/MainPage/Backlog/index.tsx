import { FC, useState } from "react";
import {
	Button, Layout, Row, Space, theme, Typography
} from "antd";
import {
	addSx,
	boxSx,
	headerStackSx,
	subTextSx,
	taskRowSx,
} from "./Backlog.sx";
import { Modal } from "../../../common";
import { CreateTaskForm } from "../../../forms";
import { BacklogProps } from "./Backlog.types";

export const Backlog: FC<BacklogProps> = ({ backlog, getBacklogData }) => {
	const [showModal, setShowModal] = useState(false);
	const { useToken } = theme;
	const { token } = useToken();

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
					Unresolved tickets
				</Typography.Title>
				<Typography.Text>View details</Typography.Text>
			</Space>
			<Space style={headerStackSx}>
				<Typography.Text style={subTextSx(token)}>
					Create new task
				</Typography.Text>
				<Button
					type="text"
					shape="circle"
					onClick={handleShowModal(true)}
					style={addSx(token)}
				>
					+
				</Button>
			</Space>
			{!!backlog?.length && (
				<Space
					direction="vertical"
					style={{ width: "100%" }}
				>
					{backlog.map((
						task, i
					) => (
						<Row
							key={i}
							style={taskRowSx(
								i < backlog?.length - 1,
								token
							)}
						>
							<Typography.Title level={4}>{task?.name}</Typography.Title>
						</Row>
					))}
				</Space>
			)}
			{!backlog?.length && (
				<Typography.Title level={4}>No tasks yet...</Typography.Title>
			)}
			<Modal
				onCancel={handleShowModal(false)}
				open={showModal}
				title="New task"
			>
				<CreateTaskForm
					backlog={backlog}
					getBacklogData={getBacklogData}
					closeModal={handleShowModal(false)}
				/>
			</Modal>
		</Layout.Content>
	);
};
