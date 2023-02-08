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
import { Button, Grid, Header, Image } from "semantic-ui-react";

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
  const tableCells:RowType[] = tickets?.map(ticket => ({
    task: {
     title: "Task",
     component: ticket.task
    },
    name: {
      title: "Name",
      component:
        <Grid>
          <Grid.Row verticalAlign="middle">
              <Image
                src={ticket.image}
                circular
                avatar
              />
              <span style={{marginLeft: "0.5rem"}}>{`${ticket.firstName} ${ticket.lastName}`}</span>
          </Grid.Row>
        </Grid>
    },
    date: {
      title: "Date",
      component: dayjs(ticket.id).format('DD/MM/YY')
    },
    status: {
      title: "Status",
      component: <StatusTag type={ticket.status}/>
    },
    actions: {
      title: "",
      component:
        <RowMenu
          onDelete={deleteTicket(ticket.id)}
          tickets={tickets}
          ticket={ticket}
          getTickets={getTicketsData}
        />
    }
  }))

  return (
		<>
      <Header as="h1">
        Clients
      </Header>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={12}>
            <Header as="h3">
              All tickets
            </Header>
          </Grid.Column>
          <Grid.Column
            textAlign="right"
            width={1}
          >
            <Button
              size="small"
              icon
              onClick={handleShowModal(true)}
            >
              +
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
              <Table
                rows={tableCells}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
		</>
	);
};
