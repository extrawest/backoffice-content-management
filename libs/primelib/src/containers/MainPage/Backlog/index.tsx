import {FC, useState} from "react";
import { Link } from "react-router-dom";
import { Modal, CreateTaskForm } from "@primelib";
import { AppRoutesEnum } from "@lib/shared/types";
import { BacklogProps } from "./Backlog.types";

export const Backlog:FC<BacklogProps> = ({backlog, getBacklogData}) => {
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
      <div className="flex justify-content-between align-items-center px-4 pu-0">
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
      {!!backlog?.length && (
        <ul className="m-0 p-0">
          {backlog?.map((
            task, i
              ) => (
                <li
                  key={i}
                  className="w-12 p-4 border-bottom-1 border-200 list-none"
                >
                  <h6 className="text-lg font-semibold m-0">
                    {task?.name}
                  </h6>
                </li>
          ))}
        </ul>
      )}
      {!backlog?.length &&
        <h4 className="text-md font-semibold text-700 px-2">
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
