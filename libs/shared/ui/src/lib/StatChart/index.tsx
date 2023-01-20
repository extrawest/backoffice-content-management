import { FC } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatChartProps } from "./StatChart.types";

export const StatChart:FC<StatChartProps> = ({
  data
}) => {
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <AreaChart
        width={500}
        height={400}
        data={data}
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
              stopColor="#1D2992"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="#fff"
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
              stopColor="#828282"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="fff"
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
  )
}
