import { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useAuth } from "@lib/muiapp";
import { Backlog } from "./Backlog";
import { Tasks } from "./Tasks";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";
import { BacklogResponse, BacklogType } from "@lib/shared/types";

export const MainPage:FC = () => {
  const me = useAuth();
  const [backlog, setBacklog] = useState<BacklogType[]>([]);

  const getBacklogData = async () => {
    try {
      if (me?.user?.uid) {
        const backlogRef = await getDocs(collection(
          db,
          "backlog"
        ));

        const data: BacklogResponse[] = [];
        backlogRef.forEach(it => {
          data.push(it.data() as BacklogResponse);
          setBacklog(data?.[0]?.tasks);
        });
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(
    () => {
      getBacklogData();
    },
    []
  );

	return (
		<>
      <Typography variant="h2">
        Dashboard
      </Typography>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          lg={6}
        >
          <Backlog
            backlog={backlog}
            getBacklogData={getBacklogData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
        >
          <Tasks
            backlog={backlog}
            getBacklog={getBacklogData}
          />
        </Grid>
      </Grid>
		</>
	);
};
