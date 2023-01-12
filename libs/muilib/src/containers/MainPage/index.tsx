import { FC, useEffect, useState } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useAuth } from "@lib/muiapp";
import { Backlog } from "./Backlog";
import { Tasks } from "./Tasks";
import { BacklogType } from "../../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../shared/firebaseconfig";

export const MainPage:FC = () => {
  const me = useAuth();
  const [backlog, setBacklog] = useState<BacklogType[]>([]);

  const getBacklogData = async () => {
    if (me?.user?.uid) {
      const backlogRef = await getDocs(collection(
        db,
        "backlog"
      ));
      const data: BacklogType[] = [];
      backlogRef.forEach(it => {
        data.push(it.data() as BacklogType);
        setBacklog(data);
      });
    }
  };

  useEffect(
    () => {
      getBacklogData();
    },
    [me]
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
          <Backlog backlog={backlog}/>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
        >
          <Tasks backlog={backlog}/>
        </Grid>
      </Grid>
		</>
	);
};
