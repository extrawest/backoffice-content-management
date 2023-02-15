import { FC, useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import dayjs from "dayjs";
import { Container, Grid, Header, List } from "semantic-ui-react";
import { ChartProps } from "./Chart.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { StatisticResponse, StatisticType } from "@lib/shared/types";

export const Chart:FC<ChartProps> = ({
	backlog,
	tasks
}) => {
  const backlogLength = backlog?.length ?? 0;
	const tasksLength = tasks?.length ?? 0;
  const [statistics, setStatistics] = useState<StatisticType[]>([])

  const getStatisticData = async () => {
    try {
        const statRef = await getDocs(collection(
          db,
          "statistic"
        ));
        const data: StatisticResponse[] = [];
        statRef.forEach(it => {
          data.push(it.data() as StatisticResponse);
          setStatistics(data?.[0]?.data);
        });
    } catch (error) {
      console.error(error)
    }
  };

  const chartData = useMemo(() => {
    return statistics.map(it => ({
      ...it,
      name: dayjs(it.date.toDate()).format('DD/MM/YY')
    }))
  }, [statistics])

  useEffect(() => {
    getStatisticData()
  }, [])

	return (
    <Container className="section">
      <Grid>
        <Grid.Row>
          <Grid.Column  width={13} className="p-2">
          <Header as="h3">
            Today&apos;s trends
          </Header>
          <ResponsiveContainer width="100%" aspect={3}>
            <AreaChart
              width={500}
              height={400}
              data={chartData}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="colorTasks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={"#1D2992"}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={"white"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient
                  id="colorBacklog"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={"grey"}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={"white"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="backlog" stackId="1" stroke="#8884d8" fill="url(#colorBacklog)" />
              <Area type="monotone" dataKey="tasks" stackId="1" stroke="#82ca9d" fill="url(#colorTasks)" />
            </AreaChart>
          </ResponsiveContainer>
          </Grid.Column>
        <Grid.Column width={3} className="chart-list">
          <List relaxed divided className="border-l">
            <List.Item className="p-2">
              <Header as="h5" textAlign="center">
                Backlog
              </Header>
              <Header as="h5" textAlign="center">
                {backlogLength}
              </Header>
            </List.Item>
            <List.Item className="p-2">
              <Header as="h5" textAlign="center">
                Tasks in progress
              </Header>
              <Header as="h5" textAlign="center">
                {tasksLength}
              </Header>
            </List.Item>
            <List.Item className="p-2">
              <Header as="h5" textAlign="center">
                Total
              </Header>
              <Header as="h5" textAlign="center">
                {backlogLength + tasksLength}
              </Header>
            </List.Item>
          </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
	);
};

