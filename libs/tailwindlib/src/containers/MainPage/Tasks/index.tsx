import {
	FC, useState
} from "react";
import { Modal } from "@tailwindlib";
import { InitTaskForm } from "../../../forms/InitTaskForm";
import { StatusTag } from "../../../components/StatusTag";
import { TasksProps } from "./Tasks.types";
import { AppRoutesEnum } from "@lib/shared/types";
import { Link } from "react-router-dom";

export const Tasks:FC<TasksProps> = ({
  backlog,
  tasks,
  getBacklog,
  getTasks
}) => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	return (
    <div className="section-border">
      <div className="flex justify-between align-middle p-2">
        <h4 className="header-section">
          Unresolved tickets
        </h4>
        <Link to={AppRoutesEnum.TEAM} className="flex items-center no-underline">
              <span className="flex items-center">
                View all
              </span>
        </Link>
      </div>
      <div className="flex justify-between align-middle p-2">
        <h5 className="sub-header">
          Create new task
        </h5>
        <button
          onClick={handleShowModal(true)}
          className="icon-btn"
        >
          +
        </button>
      </div>
      {!!tasks?.length && (
        <ul>
          {tasks?.map((
            task, i
          ) => (
            <li
              key={i}
              className="flex justify-between items-center w-full p-2 border-b border-colorBorder border-solid last:border-0"
            >
              <h6 className="task-title">
                {task?.name}
              </h6>
              <StatusTag type={task.type} />
            </li>
          ))}
        </ul>
      )}
      {!tasks?.length &&
        <h4 className="sub-header p-2">
          No tasks yet...
        </h4>
      }
      <Modal
        handleClose={handleShowModal(false)}
        open={showModal}
        title='Create new task'
      >
        <InitTaskForm
          backlog={backlog}
          tasks={tasks ?? []}
          getTasks={getTasks}
          getBacklog={getBacklog}
          closeModal={handleShowModal(false)}
        />
      </Modal>
    </div>
	);
};
