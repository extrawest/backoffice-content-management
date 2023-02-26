import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	Box, Grid, Stack, Typography, useTheme
} from "@mui/material";
import {
	boxSx,
	dataSx,
	dataTitleSx,
	dataValueSx,
	gridDataSx,
} from "./Chart.sx";
import { ChartProps } from "./Chart.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/shared";
import { StatisticResponse, StatisticType } from "@lib/shared/types";
import dayjs from "dayjs";

const getStatisticData = async (setStatistics: Dispatch<SetStateAction<StatisticType[]>>) => {
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

export const Chart: FC<ChartProps> = ({ backlog, tasks }) => {
	const theme = useTheme();
	const backlogLength = backlog?.length ?? 0;
	const tasksLength = tasks?.length ?? 0;
	const [statistics, setStatistics] = useState<StatisticType[]>([]);

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
			getStatisticData(setStatistics);
		},
		[]
	);

	return (
		<Box sx={boxSx}>
			<Grid container>
				<Grid
					item
					xs={12}
					lg={10}
					p={2}
				>
					<Typography
						variant="h3"
						mb={3}
					>
						Today’s trends
					</Typography>
					<ResponsiveContainer
						width="100%"
						aspect={3}
					>
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
										stopColor={theme.palette.primary.main}
										stopOpacity={1}
									/>
									<stop
										offset="100%"
										stopColor={theme.palette.common.white}
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
										stopColor={theme.palette.grey[500]}
										stopOpacity={1}
									/>
									<stop
										offset="100%"
										stopColor={theme.palette.common.white}
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Area
								type="monotone"
								dataKey="backlog"
								stackId="1"
								stroke="#8884d8"
								fill="url(#colorBacklog)"
							/>
							<Area
								type="monotone"
								dataKey="tasks"
								stackId="1"
								stroke="#82ca9d"
								fill="url(#colorTasks)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Grid>
				<Grid
					item
					xs={12}
					lg={2}
					sx={gridDataSx}
				>
					<Stack sx={dataSx}>
						<Typography sx={dataTitleSx}>Backlog</Typography>
						<Typography sx={dataValueSx}>{backlogLength}</Typography>
					</Stack>
					<Stack sx={dataSx}>
						<Typography sx={dataTitleSx}>Tasks in progress</Typography>
						<Typography sx={dataValueSx}>{tasksLength}</Typography>
					</Stack>
					<Stack sx={dataSx}>
						<Typography sx={dataTitleSx}>Total</Typography>
						<Typography sx={dataValueSx}>
							{backlogLength + tasksLength}
						</Typography>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};
