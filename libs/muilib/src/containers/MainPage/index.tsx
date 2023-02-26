import {
	Dispatch, FC, SetStateAction, useEffect, useState
} from "react";
import { Grid, Typography } from "@mui/material";
import { Backlog } from "./Backlog";
import { Tasks } from "./Tasks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/shared";
import { BacklogType, TaskType } from "@lib/shared/types";
import { Chart } from "./Chart";
import { useAuth } from "@lib/shared";

const getBacklogData = async (
	setBacklog: Dispatch<SetStateAction<BacklogType[]>>,
	uid?: string
) => {
	try {
		if (uid) {
			const docRef = doc(
				db,
				"backlog",
				uid
			);
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			setBacklog(data?.["tasks"]);
		}
	} catch (error) {
		console.error(error);
	}
};

const getTasksData = async (
	setTasks: Dispatch<SetStateAction<TaskType[]>>,
	uid?: string
) => {
	try {
		if (uid) {
			const docRef = doc(
				db,
				"tasks",
				uid
			);
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			setTasks(data?.["tasks"]);
		}
	} catch (error) {
		console.error(error);
	}
};

export const MainPage: FC = () => {
	const me = useAuth();
	const [backlog, setBacklog] = useState<BacklogType[]>([]);
	const [tasks, setTasks] = useState<TaskType[]>([]);

	const getBacklog = () => {
		getBacklogData(
			setBacklog,
			me?.user?.uid
		);
	};

	const getTasks = () => {
		getTasksData(
			setTasks,
			me?.user?.uid
		);
	};

	useEffect(
		() => {
			getBacklog();
			getTasks();
		},
		[]
	);

	return (
		<>
			<Typography variant="h2">Dashboard</Typography>
			<Chart
				tasks={tasks}
				backlog={backlog}
			/>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={12}
					lg={6}
				>
					<Backlog
						backlog={backlog}
						getBacklogData={getBacklog}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					lg={6}
				>
					<Tasks
						backlog={backlog}
						tasks={tasks}
						getBacklog={getBacklog}
						getTasks={getTasks}
					/>
				</Grid>
			</Grid>
		</>
	);
};
