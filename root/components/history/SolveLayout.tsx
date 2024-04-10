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
	idx: number;
}

const SolveLayout: FunctionComponent<SolveLayoutProps> = ({ solve, idx }) => {
	return (
		<div>
			<div>{idx}.</div>
			<div>date: {formatData(solve.dateTimeStamp)}</div>
			<div>time: {solve.time}</div>
			<div>scramble: {solve.scramble}</div>
		</div>
	);
};

export default SolveLayout;
