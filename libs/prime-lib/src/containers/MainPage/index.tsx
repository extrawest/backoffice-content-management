import { FC, useEffect, useState } from "react";
import { Backlog } from "./Backlog";
import { Tasks } from "./Tasks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import { BacklogType, TaskType } from "@lib/shared/types";
import { Chart } from "./Chart";
import { useAuth } from "../../../../shared/context/Auth";
import { Panel } from "primereact/panel";

export const MainPage:FC = () => {
  const me = useAuth();
  const [backlog, setBacklog] = useState<BacklogType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getBacklogData = async () => {
    try {
      if (me?.user?.uid) {
        const docRef = doc(db, "backlog", me?.user?.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setBacklog(data?.["tasks"]);
      }
    } catch (error) {
      console.error(error)
    }
  };

  const getTasksData = async () => {
    try {
      if (me?.user?.uid) {
        const docRef = doc(db, "tasks", me?.user?.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setTasks(data?.["tasks"]);
      }
    } catch (error) {
      console.error(error)
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
		<Panel className="panel">
      <h1 className="text-4xl font-bold mb-4">
        Dashboard
      </h1>
      <Chart
        tasks={tasks}
        backlog={backlog}
      />
      <div className="flex gap-4">
        <div className="w-6">
          <Backlog
            backlog={backlog}
            getBacklogData={getBacklogData}
          />
        </div>
        <div className="w-6">
          <Tasks
            backlog={backlog ?? []}
            tasks={tasks}
            getBacklog={getBacklogData}
            getTasks={getTasksData}
          />
        </div>
      </div>
		</Panel>
	);
};
