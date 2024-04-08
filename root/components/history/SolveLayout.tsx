import Solve from "@/root/logic/history/model/Solve";
import { FunctionComponent } from "react";

const formatData = (timeStamp: number) =>
	new Date(timeStamp).toLocaleDateString("ru", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

interface SolveLayoutProps {
	solve: Solve;
}

const SolveLayout: FunctionComponent<SolveLayoutProps> = ({ solve }) => {
	return (
		<div style={{ marginBottom: "1rem" }}>
			<div>date: {formatData(solve.dateTimeStamp)}</div>
			<div>time: {solve.time}</div>
			<div>scramble: {solve.scramble}</div>
		</div>
	);
};

export default SolveLayout;
