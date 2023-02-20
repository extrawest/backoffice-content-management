import { FC, useState } from "react";
import {
	Box, IconButton, Stack, Typography
} from "@mui/material";
import { Modal } from "../../../common";
import { InitTaskForm } from "../../../forms";
import { StatusTag } from "../../../components/StatusTag";
import { TasksProps } from "./Tasks.types";
import {
	addSx,
	boxSx,
	headerStackSx,
	subTextSx,
	taskRowSx,
	linkSx,
} from "./Tasks.sx";
import { AppRoutesEnum } from "@lib/shared/types";
import { Link } from "react-router-dom";

export const Tasks: FC<TasksProps> = ({
	backlog,
	tasks,
	getBacklog,
	getTasks,
}) => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	return (
		<Box sx={boxSx}>
			<Stack sx={headerStackSx}>
				<Typography variant="h4">Tasks</Typography>
				<Link
					to={AppRoutesEnum.TEAM}
					style={linkSx}
				>
					<Typography
						variant="caption"
						color="primary"
					>
						View all
					</Typography>
				</Link>
			</Stack>
			<Stack sx={headerStackSx}>
				<Typography sx={subTextSx}>Create new task</Typography>
				<IconButton
					onClick={handleShowModal(true)}
					sx={addSx}
				>
					+
				</IconButton>
			</Stack>
			{!!tasks?.length && (
				<Stack>
					{tasks.map((
						task, i
					) => (
						<Box
							key={i}
							sx={taskRowSx(i < tasks?.length - 1)}
						>
							<Typography variant="h6">{task?.name}</Typography>
							<StatusTag type={task.type} />
						</Box>
					))}
				</Stack>
			)}
			{!tasks?.length && (
				<Typography
					variant="h4"
					p={2}
				>
					No tasks yet...
				</Typography>
			)}
			<Modal
				handleClose={handleShowModal(false)}
				open={showModal}
				fullWidth
				title="Create new task"
				type="lg"
			>
				<InitTaskForm
					backlog={backlog}
					tasks={tasks}
					getTasks={getTasks}
					getBacklog={getBacklog}
					closeModal={handleShowModal(false)}
				/>
			</Modal>
		</Box>
	);
};
