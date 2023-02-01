import {FC, useState} from "react";
import { Modal } from "@lib/tailwind";
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
    <div className="border-1 border-round-md border-300">
      <div className="flex justify-content-between align-items-center p-4 pb-0">
        <h4 className="text-2xl m-0">
          Unresolved tickets
        </h4>
        <Link
          to={AppRoutesEnum.TEAM}
          className="no-underline"
        >
              <span>
                View all
              </span>
        </Link>
      </div>
      <div className="flex justify-content-between align-items-center px-4 py-0">
        <h5 className="text-sm font-semibold text-700">
          Create new task
        </h5>
        <button
          onClick={handleShowModal(true)}
          className="text-xl cursor-pointer text-700 surface-200 hover:surface-300 outline-none border-none border-round-sm"
        >
          +
        </button>
      </div>
      {!!tasks?.length && (
        <ul className="m-0 p-0">
          {tasks?.map((
            task, i
          ) => (
            <li
              key={i}
              className="w-12 p-4 border-bottom-1 border-200 list-none align-items-center flex justify-content-between"
            >
              <h6 className="text-lg font-semibold m-0">
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
