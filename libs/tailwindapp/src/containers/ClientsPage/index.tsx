import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Avatar,
  Box, IconButton, Stack, Typography
} from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Modal, Table } from "../../common";
import { CreateTicketForm } from "../../forms/CreateTicketForm";
import { TaskType, TicketType } from "@lib/shared/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import { StatusTag } from "../../components/StatusTag";
import { useAuth } from "../../../../shared/context/Auth";
import { RowMenu } from "./RowMenu";
import { nameSx, photoSx, titleSx, wrapperSx } from "./ClientsPage.sx";

export const ClientsPage:FC = () => {
	const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const me = useAuth();

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

  const getTicketsData = async () => {
    try {
      if (me?.user?.uid) {
        const docRef = doc(db, "tickets", me?.user?.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setTickets(data?.["data"]);
      }
    } catch (error) {
      console.error(error)
    }
  };

  const deleteTicket = (taskId: string) => async () => {
    try {
      if (me.user?.uid) {
        await setDoc(
          doc(
            db,
            "tickets",
            me.user?.uid
          ),
          {
            data: tickets.filter(ticket => ticket.id !== taskId)
          }
        );
      }
    } catch (error) {
      console.error(error)
    } finally {
      getTicketsData()
    }
  }

  useEffect(
    () => {
      getTasksData();
      getTicketsData();
    },
    []
  );

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

  const rows: GridRowsProp = tickets?.map(ticket => ({
    id: ticket?.id,
    task: ticket.task,
    name: `${ticket.firstName} ${ticket.lastName}`,
    firstName: ticket.firstName,
    lastName: ticket.lastName,
    date: dayjs(ticket.id).format('DD/MM/YY'),
    status: ticket.status,
    image: ticket.image ?? ''
  })) ?? []

	const columns: GridColDef[] = [
		{
      field: "task",
      headerName: "Ticket details",
      flex: 1
    },
		{
      field: "name",
      headerName: "Customer name",
      renderCell: (params) => (
        <Box sx={nameSx}>
          <Avatar
            src={params.row.image}
            sx={photoSx}
          />
          <Typography>
            {params.row.name}
          </Typography>
        </Box>
      ),
      flex: 1
    },
		{
      field: "date",
      headerName: "Date",
      flex: 1
    },
		{
      field: "status",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => <StatusTag type={params.row.status}/>
    },
		{
      field: "delete",
      headerName: "",
      flex: 1,
      cellClassName: 'hoverableCell',
      renderCell: (params) =>
        <RowMenu
          onDelete={deleteTicket(params.row.id)}
          tickets={tickets}
          ticket={params.row}
          getTickets={getTicketsData}
        />
    },
	];

	return (
		<>
      <h1 className="header-main">
        Clients
      </h1>
      <div className="max-w-table w-full">
        <div className="flex justify-between items-center">
          <h4 className="header-section">
            All tickets
          </h4>
          <div className="flex justify-between align-middle p-2">
            <button
              onClick={handleShowModal(true)}
              className="icon-btn"
            >
              +
            </button>
          </div>
        </div>
        <Table
          rows={rows}
          columns={columns}
        />
        <Modal
          handleClose={handleShowModal(false)}
          open={showModal}
          title="Create ticket"
        >
          <CreateTicketForm
            tasks={tasks}
            tickets={tickets}
            getTasks={getTasksData}
            getTickets={getTicketsData}
            closeModal={handleShowModal(false)}
          />
        </Modal>
      </div>
		</>
	);
};
