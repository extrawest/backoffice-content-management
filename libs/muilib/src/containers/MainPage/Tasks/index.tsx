import {
	FC, useEffect, useState
} from "react";
import {
	addSx, boxSx, headerStackSx, subTextSx
} from "./Tasks.sx";
import {
	Box,
	IconButton, Stack, Typography
} from "@mui/material";
import { Modal, useAuth } from "@lib/muiapp";
import { BacklogType } from "../../../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { taskRowSx } from "../Backlog/Backlog.sx";
import { InitTaskForm } from "../../../forms/InitTaskForm";
import { TasksProps } from "./Tasks.types";

export const Tasks:FC<TasksProps> = ({
  backlog
}) => {
	const me = useAuth();
	const [tasks, setTasks] = useState<BacklogType[]>([]);
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
			const data: BacklogType[] = [];
			tasksRef.forEach(it => {
				data.push(it.data() as BacklogType);
				setTasks(data);
			});
		}
	};

	useEffect(
		() => {
			getData();
		},
		[me]
	);

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
      {!!tasks.length && (
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
            </Box>
          ))}
        </Stack>
      )}
      {!tasks.length &&
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
        <InitTaskForm backlog={backlog}/>
      </Modal>
    </Box>
	);
};
