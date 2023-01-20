import { FC, useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import {
	boxSx, dataSx, dataTitleSx, dataValueSx, gridDataSx
} from "./Chart.sx";
import { ChartProps } from "./Chart.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../shared/firebaseconfig";
import { StatisticResponse, StatisticType } from "@lib/shared/types";
import dayjs from "dayjs";
import { StatChart } from "../../../../../shared/ui/src/lib/StatChart";
import { Col, Layout, Row, Space, Typography, theme } from "antd";
import { Spa } from "@mui/icons-material";

export const Chart:FC<ChartProps> = ({
	backlog,
	tasks
}) => {
  const { useToken } = theme;
  const { token } = useToken();
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
  console.log(token)
	return (
    <Layout.Content style={boxSx(token)}>
      <Row>
        <Col
          span={20}
          style={{padding: "1rem"}}
        >
          <Typography.Title level={3} style={{marginBottom: "3rem"}}>
            Today’s trends
          </Typography.Title>
          <StatChart data={chartData} />
        </Col>
        <Col
          span={4}
          style={gridDataSx(token)}
        >
          <Space direction="vertical" style={dataSx(token)}>
            <Typography.Text style={dataTitleSx(token)}>
              Backlog
            </Typography.Text>
            <Typography.Text style={dataValueSx(token)}>
              {backlogLength}
            </Typography.Text>
          </Space>
          <Space direction="vertical" style={dataSx(token)}>
            <Typography.Text style={dataTitleSx(token)}>
              Tasks in progress
            </Typography.Text>
            <Typography.Text style={dataValueSx(token)}>
              {tasksLength}
            </Typography.Text>
          </Space>
          <Space direction="vertical" style={dataSx(token)}>
            <Typography.Text style={dataTitleSx(token)}>
              Total
            </Typography.Text>
            <Typography.Text style={dataValueSx(token)}>
              {backlogLength + tasksLength}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Layout.Content>
	);
};
