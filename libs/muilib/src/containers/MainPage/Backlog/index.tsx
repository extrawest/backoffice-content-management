import {FC, useState} from "react";
import {
	Box, IconButton, Stack, Typography
} from "@mui/material";
import {
	addSx, boxSx, headerStackSx, subTextSx, taskRowSx
} from "./Backlog.sx";
import { Modal } from "../../../common/Modal";
import { CreateTaskForm } from "../../../forms/CreateTaskForm";
import { BacklogProps } from "./Backlog.types";

export const Backlog:FC<BacklogProps> = ({backlog, getBacklogData}) => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	return (
    <Box sx={boxSx}>
      <Stack sx={headerStackSx}>
        <Typography variant="h4">
          Unresolved tickets
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
      {!!backlog.length && (
        <Stack>
          {backlog.map((
            task, i
              ) => (
            <Box
              key={i}
              sx={taskRowSx(i < backlog.length - 1)}
            >
              <Typography variant='h6'>
                {task?.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
      {!backlog.length &&
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
        <CreateTaskForm
          backlog={backlog}
          getBacklogData={getBacklogData}
          closeModal={handleShowModal(false)}
        />
      </Modal>
    </Box>
	);
};
