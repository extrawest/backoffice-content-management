import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Modal, Table } from "../../common";
import { CreateTicketForm } from "../../forms/CreateTicketForm";
import { TaskType, TicketType } from "@lib/shared/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import { StatusTag } from "../../components/StatusTag";
import { useAuth } from "../../../../shared/context/Auth";
import { RowMenu } from "./RowMenu";
import { RowType } from "../../common/Table/Table.types";
import { Panel } from "primereact/panel";

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

  const rows:RowType[] = [
    {
      title: "Task",
      id: "task",
      items: tickets?.map(item => item.task) ?? []
    },
    {
      title: "Name",
      id: "name",
      items: tickets?.map(item => (
        <div className="flex gap-1">
          <img
            src={item.image}
            className="border-circle size-3 object-cover"
          />
          <p>
            {`${item.firstName} ${item.lastName}`}
          </p>
        </div> ?? []
      ))
    },
    {
      title: "Date",
      id: "date",
      items: tickets?.map(item => dayjs(item.id).format('DD/MM/YY')) ?? []
    },
    {
      title: "Status",
      id: "status",
      items: tickets?.map(item => <StatusTag type={item.status}/>) ?? []
    },
    {
      title: "",
      id: "actions",
      items: tickets?.map(item => (
        <RowMenu
          onDelete={deleteTicket(item.id)}
          tickets={tickets}
          ticket={item}
          getTickets={getTicketsData}
        />
      )) ?? []
    }
  ]

	return (
    <Panel className="panel">
      <h1 className="text-4xl font-bold mb-4">
        Clients
      </h1>
      <div className="max-w-table w-12">
        <div className="flex justify-content-between align-items-center">
          <h4 className="text-3xl">
            All tickets
          </h4>
          <div className="flex justify-content-between align-items-center p-4">
            <button
              onClick={handleShowModal(true)}
              className="text-xl cursor-pointer text-700 surface-200 hover:surface-300 outline-none border-none border-round-sm"
            >
              +
            </button>
          </div>
        </div>
        <Table
          rows={rows}
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
    </Panel>
	);
};
