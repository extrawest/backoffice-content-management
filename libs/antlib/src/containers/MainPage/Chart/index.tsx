import {
	FC, useEffect, useMemo, useState
} from "react";
import {
	Col, Layout, Row, Space, Typography, theme
} from "antd";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/shared";
import { StatisticResponse, StatisticType } from "@lib/shared/types";
import { StatChart } from "@lib/shared/ui";
import {
	boxSx,
	dataSx,
	dataTitleSx,
	dataValueSx,
	gridDataSx,
} from "./Chart.sx";
import { ChartProps } from "./Chart.types";

export const Chart: FC<ChartProps> = ({ backlog, tasks }) => {
	const { useToken } = theme;
	const { token } = useToken();
	const backlogLength = backlog?.length ?? 0;
	const tasksLength = tasks?.length ?? 0;
	const [statistics, setStatistics] = useState<StatisticType[]>([]);

	const getStatisticData = async () => {
		try {
			const statRef = await getDocs(collection(
				db,
				"statistic"
			));
			const data: StatisticResponse[] = [];
			statRef.forEach((it) => {
				data.push(it.data() as StatisticResponse);
				setStatistics(data?.[0]?.data);
			});
		} catch (error) {
			console.error(error);
		}
	};

	const chartData = useMemo(
		() => {
			return statistics.map((it) => ({
				...it,
				name: dayjs(it.date).format("DD/MM/YY"),
			}));
		},
		[statistics]
	);

	useEffect(
		() => {
			getStatisticData();
		},
		[]
	);
	console.log(token);
	return (
		<Layout.Content style={boxSx(token)}>
			<Row>
				<Col
					span={20}
					style={{ padding: "1rem" }}
				>
					<Typography.Title
						level={3}
						style={{ marginBottom: "3rem" }}
					>
						Today’s trends
					</Typography.Title>
					<StatChart data={chartData} />
				</Col>
				<Col
					span={4}
					style={gridDataSx(token)}
				>
					<Space
						direction="vertical"
						style={dataSx(token)}
					>
						<Typography.Text style={dataTitleSx(token)}>
							Backlog
						</Typography.Text>
						<Typography.Text style={dataValueSx(token)}>
							{backlogLength}
						</Typography.Text>
					</Space>
					<Space
						direction="vertical"
						style={dataSx(token)}
					>
						<Typography.Text style={dataTitleSx(token)}>
							Tasks in progress
						</Typography.Text>
						<Typography.Text style={dataValueSx(token)}>
							{tasksLength}
						</Typography.Text>
					</Space>
					<Space
						direction="vertical"
						style={dataSx(token)}
					>
						<Typography.Text style={dataTitleSx(token)}>Total</Typography.Text>
						<Typography.Text style={dataValueSx(token)}>
							{backlogLength + tasksLength}
						</Typography.Text>
					</Space>
				</Col>
			</Row>
		</Layout.Content>
	);
};
