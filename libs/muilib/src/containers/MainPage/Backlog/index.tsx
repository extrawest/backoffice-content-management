import {FC, useState} from "react";
import {
	Box, IconButton, Stack, Typography
} from "@mui/material";
import {
  addSx, boxSx, headerStackSx, linkSx, subTextSx, taskRowSx
} from "./Backlog.sx";
import { Modal } from "@lib/muiapp";
import { CreateTaskForm } from "@lib/muiapp";
import { BacklogProps } from "./Backlog.types";
import { Link } from "react-router-dom";
import { AppRoutesEnum } from "@lib/shared/types";

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
        <Link to={AppRoutesEnum.TEAM} style={linkSx}>
          <Typography variant="caption" color="primary">
            View all
          </Typography>
        </Link>
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
      {!!backlog?.length && (
        <Stack>
          {backlog.map((
            task, i
              ) => (
            <Box
              key={i}
              sx={taskRowSx(i < backlog?.length - 1)}
            >
              <Typography variant='h6'>
                {task?.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
      {!backlog?.length &&
        <Typography variant="h4" p={2}>
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
