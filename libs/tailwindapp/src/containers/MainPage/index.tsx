import {
	FC, useEffect, useState
} from "react";
import { Backlog } from "./Backlog";
import { Tasks } from "./Tasks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@libs/shared/firebaseconfig";
import { BacklogType, TaskType } from "@lib/shared/types";
import { Chart } from "./Chart";
import { useAuth } from "@lib/shared";

export const MainPage:FC = () => {
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
      <h1 className="header-main">
        Dashboard
      </h1>
      <Chart
        tasks={tasks}
        backlog={backlog}
      />
      <div className="flex gap-2">
        <div className="flex-1 w-1/2">
          <Backlog
            backlog={backlog}
            getBacklogData={getBacklogData}
          />
        </div>
        <div className="flex-1 w-1/2">
          <Tasks
            backlog={backlog ?? []}
            tasks={tasks}
            getBacklog={getBacklogData}
            getTasks={getTasksData}
          />
        </div>
      </div>
		</>
	);
};
