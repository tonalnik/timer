import Solve from "@/root/logic/history/model/Solve";
import { FunctionComponent } from "react";
import SolveLayout from "./SolveLayout";

interface HistoryLayoutProps {
	solves: Solve[];
}

const HistoryLayout: FunctionComponent<HistoryLayoutProps> = ({ solves }) => {
	return (
		<div style={{ overflow: "auto", maxHeight: "300px", padding: "1rem" }}>
			{solves.toReversed().map((solve, idx) => (
				<SolveLayout solve={solve} key={idx} />
			))}
		</div>
	);
};

export default HistoryLayout;
