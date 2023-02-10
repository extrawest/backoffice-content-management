import { FC, useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import dayjs from "dayjs";
import { StatisticResponse, StatisticType } from "@lib/shared/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { ChartProps } from "./Chart.types";

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
    <div className="border-1 mb-4 border-round-md border-300">
      <div className="flex">
        <div className="w-10 p-2">
          <h4 className="text-2xl font-semibold m-4 mt-2">
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
        <div className="py-2 border-left-1 border-300 w-2">
          <ul className="w-12 m-0 p-0">
            <li className="list-none border-bottom-1 border-300">
              <h5 className="text-xl font-semibold text-700 text-center">
                Backlog
              </h5>
              <p className="text-2xl font-bold text-center">
                {backlogLength}
              </p>
            </li>
            <li className="list-none border-bottom-1 border-300">
              <h5 className="text-xl font-semibold text-700 text-center">
                Tasks in progress
              </h5>
              <p className="text-2xl font-bold text-center">
                {tasksLength}
              </p>
            </li>
            <li className="list-none border-bottom-1 border-300">
              <h5 className="text-xl font-semibold text-700 text-center">
                Total
              </h5>
              <p className="text-2xl font-bold text-center">
                {backlogLength + tasksLength}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
	);
};

