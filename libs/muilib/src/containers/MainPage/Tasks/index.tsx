import {
	FC, useEffect, useState
} from "react";
import {
	Box,
	IconButton, Stack, Typography
} from "@mui/material";
import { Modal, useAuth } from "@lib/muiapp";
import { TasksResponse, TaskType } from "@lib/shared/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { InitTaskForm } from "../../../forms/InitTaskForm";
import { StatusTag } from "../../../components/StatusTag";
import { TasksProps } from "./Tasks.types";
import {
  addSx, boxSx, headerStackSx, subTextSx, taskRowSx
} from "./Tasks.sx";

export const Tasks:FC<TasksProps> = ({
  backlog,
  getBacklog
}) => {
	const me = useAuth();
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	const getData = async () => {
		if (me?.user?.uid) {
			const tasksRef = await getDocs(collection(
				db,
				"tasks"
			));
			const data: TasksResponse[] = [];
			tasksRef.forEach(it => {
				data.push(it.data() as TasksResponse);
				setTasks(data?.[0]?.tasks);
			});
		}
	};

	useEffect(
		() => {
			getData();
		},
		[me]
	);

  console.log(tasks, 'tasks')

	return (
    <Box sx={boxSx}>
      <Stack sx={headerStackSx}>
        <Typography variant="h4">
          Tasks
        </Typography>
        <Typography variant="caption">
          View details
        </Typography>
      </Stack>
      <Stack sx={headerStackSx}>
        <Typography sx={subTextSx}>
          Create new task
        </Typography>
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
              sx={taskRowSx(i < tasks.length - 1)}
            >
              <Typography variant='h6'>
                {task?.name}
              </Typography>
              <StatusTag type={task.type} />
            </Box>
          ))}
        </Stack>
      )}
      {!tasks?.length &&
        <Typography variant="h4">
          No tasks yet...
        </Typography>
      }
      <Modal
        handleClose={handleShowModal(false)}
        open={showModal}
        fullWidth
        title='Create new task'
        type='lg'
      >
        <InitTaskForm
          backlog={backlog}
          tasks={tasks}
          getTasks={getData}
          getBacklog={getBacklog}
          closeModal={handleShowModal(false)}
        />
      </Modal>
    </Box>
	);
};
