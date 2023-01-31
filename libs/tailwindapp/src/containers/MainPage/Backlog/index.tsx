import {FC, useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "@lib/tailwind";
import { CreateTaskForm } from "../../../forms";
import { AppRoutesEnum } from "@lib/shared/types";
import { BacklogProps } from "./Backlog.types";

export const Backlog:FC<BacklogProps> = ({backlog, getBacklogData}) => {
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
      {!!backlog?.length && (
        <ul>
          {backlog?.map((
            task, i
              ) => (
                <li
                  key={i}
                  className="w-full p-2 border-b border-colorBorder border-solid last:border-0"
                >
                  <h6 className="task-title">
                    {task?.name}
                  </h6>
                </li>
          ))}
        </ul>
      )}
      {!backlog?.length &&
        <h4 className="sub-header p-2">
          No tasks yet...
        </h4>
      }
      <Modal
        handleClose={handleShowModal(false)}
        open={showModal}
        title='Create new task'
      >
        <CreateTaskForm
          backlog={backlog ?? []}
          getBacklogData={getBacklogData}
          closeModal={handleShowModal(false)}
        />
      </Modal>
    </div>
	);
};
