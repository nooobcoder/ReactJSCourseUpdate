import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = ({ dataPoints }) => {
	console.log("DATA POINTS", dataPoints);
	const dataPointValues = dataPoints.map((dataPoint) => dataPoint.value);
	const totalMaximum = Math.max(...dataPointValues);
	return (
		<div className="chart">
			{dataPoints.map((point) => (
				<ChartBar
					key={point.label}
					value={point.value}
					maxValue={totalMaximum}
					label={point.label}
				/>
			))}
		</div>
	);
};

export default Chart;
