import {FC, useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "@lib/tailwind";
import { CreateTaskForm } from "../../../forms";
import { AppRoutesEnum } from "@lib/shared/types";
import { BacklogProps } from "./Backlog.types";
import {
	Button,
	Container, Grid, Header, List
} from "semantic-ui-react";

export const Backlog:FC<BacklogProps> = ({backlog, getBacklogData}) => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = (status: boolean) => () => {
		setShowModal(status);
	};

	return (
    <Container className="section">
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h3">
              Backlog
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Link
              to={AppRoutesEnum.TEAM}
            >
              <Header
                as="h5"
                color="blue"
                textAlign="right"
              >
                View all
              </Header>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid padded>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={12}>
            <Header as="h5">
              Create new task
            </Header>
          </Grid.Column>
          <Grid.Column
            textAlign="right"
            width={4}
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
      {!!backlog?.length && (
        <List
          divided
          relaxed
        >
          {backlog?.map((
            task, i
              ) => (
                <List.Item
                  key={i}
                  className="p-2"
                >
                  <Header as="h5">
                    {task?.name}
                  </Header>
                </List.Item>
          ))}
        </List>
      )}
      {!backlog?.length &&
        <Grid padded>
          <Header.Subheader>
            No tasks yet...
          </Header.Subheader>
        </Grid>
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
    </Container>
	);
};
