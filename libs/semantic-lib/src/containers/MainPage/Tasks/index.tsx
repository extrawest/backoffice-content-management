import {FC, useState} from "react";
import { Modal } from "@lib/tailwind";
import { InitTaskForm } from "../../../forms/InitTaskForm";
import { StatusTag } from "../../../components/StatusTag";
import { TasksProps } from "./Tasks.types";
import { AppRoutesEnum } from "@lib/shared/types";
import { Link } from "react-router-dom";
import {
	Button,
	Container, Grid, Header, List
} from "semantic-ui-react";

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
    <Container className="section">
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h3">
              Unresolved tasks
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
      {!!tasks?.length && (
        <List
          divided
          relaxed
        >
          {tasks?.map((
            task, i
          ) => (
            <List.Item
              key={i}
              className="p-2"

            >
              <Grid>
                <Grid.Row
                  verticalAlign="middle"
                >
                  <Grid.Column width={12}>
                    <Header as="h5">
                      {task?.name}
                    </Header>
                  </Grid.Column>
                  <Grid.Column
                    width={4}
                    textAlign="right"
                  >
                    <StatusTag type={task.type} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </List.Item>
          ))}
        </List>
      )}
      {!tasks?.length &&
        <Grid padded>
          <Header.Subheader>
            No tasks yet...
          </Header.Subheader>
        </Grid>
      }
      {/*<Modal*/}
      {/*  handleClose={handleShowModal(false)}*/}
      {/*  open={showModal}*/}
      {/*  title='Create new task'*/}
      {/*>*/}
      {/*  <InitTaskForm*/}
      {/*    backlog={backlog}*/}
      {/*    tasks={tasks ?? []}*/}
      {/*    getTasks={getTasks}*/}
      {/*    getBacklog={getBacklog}*/}
      {/*    closeModal={handleShowModal(false)}*/}
      {/*  />*/}
      {/*</Modal>*/}
    </Container>
	);
};
