import {
	FC, useEffect, useState
} from "react";
import dayjs from "dayjs";
import { Modal, Table } from "../../common";
import { CreateTicketForm } from "../../forms";
import { TaskType, TicketType } from "@lib/shared/types";
import {
	doc, getDoc, setDoc
} from "firebase/firestore";
import { db } from "@lib/shared";
import { StatusTag } from "../../components/StatusTag";
import { RowMenu } from "./RowMenu";
import { RowType } from "../../common/Table/Table.types";
import { useAuth } from "@lib/shared";

export const ClientsPage: FC = () => {
	const [showModal, setShowModal] = useState(false);
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [tickets, setTickets] = useState<TicketType[]>([]);
	const me = useAuth();

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

	const rows: RowType[] = [
		{
			title: "Task",
			id: "task",
			items: tickets?.map((item) => item.task) ?? [],
		},
		{
			title: "Name",
			id: "name",
			items: tickets?.map((item) =>
				(
					<div className="flex gap-1">
						<img
							src={item.image}
							className="rounded-full w-3 h-3 object-cover"
							alt=""
						/>
						<p>{`${item.firstName} ${item.lastName}`}</p>
					</div>
				) ?? []),
		},
		{
			title: "Date",
			id: "date",
			items: tickets?.map((item) => dayjs(item.id).format("DD/MM/YY")) ?? [],
		},
		{
			title: "Status",
			id: "status",
			items: tickets?.map((
				item, index
			) => (
				<StatusTag
					key={index}
					type={item.status}
				/>
			)) ?? [],
		},
		{
			title: "",
			id: "actions",
			items:
				tickets?.map((
					item, index
				) => (
					<RowMenu
						key={index}
						onDelete={deleteTicket(item.id)}
						tickets={tickets}
						ticket={item}
						getTickets={getTicketsData}
					/>
				)) ?? [],
		},
	];

	return (
		<>
			<h1 className="header-main">Clients</h1>
			<div className="max-w-table w-full">
				<div className="flex justify-between items-center">
					<h4 className="header-section">All tickets</h4>
					<div className="flex justify-between align-middle p-2">
						<button
							onClick={handleShowModal(true)}
							className="icon-btn"
						>
							+
						</button>
					</div>
				</div>
				<Table rows={rows} />
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
