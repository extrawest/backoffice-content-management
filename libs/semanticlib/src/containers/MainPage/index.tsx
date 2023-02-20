import {
	FC, useEffect, useState
} from "react";
import { Backlog } from "./Backlog";
import { Tasks } from "./Tasks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/shared";
import { BacklogType, TaskType } from "@lib/shared/types";
import { Chart } from "./Chart";
import { Grid, Header } from "semantic-ui-react";
import { useAuth } from "@lib/shared";

export const MainPage: FC = () => {
	const me = useAuth();
	const [backlog, setBacklog] = useState<BacklogType[]>([]);
	const [tasks, setTasks] = useState<TaskType[]>([]);

	const getBacklogData = async () => {
		try {
			if (me?.user?.uid) {
				const docRef = doc(
					db,
					"backlog",
					me?.user?.uid
				);
				const docSnap = await getDoc(docRef);
				const data = docSnap.data();
				setBacklog(data?.["tasks"]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getTasksData = async () => {
		try {
			if (me?.user?.uid) {
				const docRef = doc(
					db,
					"tasks",
					me?.user?.uid
				);
				const docSnap = await getDoc(docRef);
				const data = docSnap.data();
				setTasks(data?.["tasks"]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(
		() => {
			getBacklogData();
			getTasksData();
		},
		[]
	);

	return (
		<>
			<Header as="h1">Dashboard</Header>
			<Grid relaxed>
				<Grid.Row>
					<Grid.Column width={14}>
						<Chart
							tasks={tasks}
							backlog={backlog}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={7}>
						<Backlog
							backlog={backlog}
							getBacklogData={getBacklogData}
						/>
					</Grid.Column>
					<Grid.Column width={7}>
						<Tasks
							backlog={backlog ?? []}
							tasks={tasks}
							getBacklog={getBacklogData}
							getTasks={getTasksData}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};
