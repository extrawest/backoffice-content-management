import {
	FC, useEffect, useState
} from "react";
import {
	Avatar, Button, Layout, Space, theme, Typography
} from "antd";
import dayjs from "dayjs";
import { Delete } from "@mui/icons-material";
import { useAuth } from "@lib/shared";
import { Modal, Table } from "../../common";
import { CreateTicketForm } from "../../forms/CreateTicketForm";
import { TaskType, TicketType } from "@lib/shared/types";
import {
	doc, getDoc, setDoc
} from "firebase/firestore";
import { db } from "@lib/shared";
import {
	addSx,
	headerStackSx,
	subTextSx,
} from "../MainPage/Backlog/Backlog.sx";
import { titleSx } from "./ClientsPage.sx";

export const ClientsPage: FC = () => {
	const [showModal, setShowModal] = useState(false);
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [tickets, setTickets] = useState<TicketType[]>([]);
	const me = useAuth();
	const { useToken } = theme;
	const { token } = useToken();

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

	const getTicketsData = async () => {
		try {
			if (me?.user?.uid) {
				const docRef = doc(
					db,
					"tickets",
					me?.user?.uid
				);
				const docSnap = await getDoc(docRef);
				const data = docSnap.data();
				setTickets(data?.["data"]);
			}
		} catch (error) {
			console.error(error);
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
						data: tickets.filter((ticket) => ticket.id !== taskId),
					}
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			getTicketsData();
		}
	};

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

	const dataSource =
		tickets?.map((ticket) => ({
			key: ticket?.id,
			task: ticket.task,
			name: (
				<Space>
					<Avatar
						src={ticket.image}
						size={40}
					/>
					{`${ticket.firstName} ${ticket.lastName}`}
				</Space>
			),
			date: dayjs(ticket.id).format("DD/MM/YY"),
			status: ticket.status,
			delete: (
				<Button
					type="text"
					shape="circle"
					onClick={deleteTicket(ticket.id)}
				>
					<Delete />
				</Button>
			),
		})) ?? [];

	const columns = [
		{
			dataIndex: "task",
			title: "Ticket details",
			key: "title",
		},
		{
			dataIndex: "name",
			title: "Customer name",
			key: "name",
		},
		{
			dataIndex: "date",
			title: "Date",
			key: "date",
		},
		{
			dataIndex: "status",
			title: "Priority",
			key: "status",
		},
		{
			dataIndex: "delete",
			title: "",
			key: "delete",
		},
	];

	return (
		<>
			<Typography.Title level={1}>Clients</Typography.Title>
			<Layout.Content>
				<Space style={titleSx}>
					<Typography.Title level={3}>All tickets</Typography.Title>
					<Space style={headerStackSx}>
						<Button
							type="text"
							shape="circle"
							onClick={handleShowModal(true)}
							style={addSx(token)}
						>
							+
						</Button>
						<Typography.Text style={subTextSx(token)}>Add</Typography.Text>
					</Space>
				</Space>
				<Table
					dataSource={dataSource}
					columns={columns}
				/>
				<Modal
					onCancel={handleShowModal(false)}
					open={showModal}
					title="Create new ticket"
				>
					<CreateTicketForm
						tasks={tasks}
						tickets={tickets}
						getTasks={getTasksData}
						getTickets={getTicketsData}
						closeModal={handleShowModal(false)}
					/>
				</Modal>
			</Layout.Content>
		</>
	);
};
