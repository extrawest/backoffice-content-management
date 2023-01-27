import { FC, useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { ChartProps } from "./Chart.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { StatisticResponse, StatisticType } from "@lib/shared/types";
import dayjs from "dayjs";

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
    <div className="section-border mb-2">
      <div className="flex">
        <div className="w-10/12 p-2">
          <h4 className="header-section mb-6">
            Today&apos;s trends
          </h4>
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
        </div>
        <div className="py-2 border-l border-solid border-colorBorder w-2/12">
          <ul className="w-full">
            <li className="chart-list-item">
              <h5 className="text-chart">
                Backlog
              </h5>
              <p className="text-chart-value">
                {backlogLength}
              </p>
            </li>
            <li className="chart-list-item">
              <h5 className="text-chart">
                Tasks in progress
              </h5>
              <p className="text-chart-value">
                {tasksLength}
              </p>
            </li>
            <li className="chart-list-item">
              <h5 className="text-chart">
                Total
              </h5>
              <p className="text-chart-value">
                {backlogLength + tasksLength}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
	);
};

