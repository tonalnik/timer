import Solve from "@/root/logic/history/model/Solve";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import SolveLayout from "./SolveLayout";

interface HistoryLayoutProps {
	solves: Solve[];
	onDelete?: (idx: number) => void;
	onDeleteAll?: () => void;
	className?: string;
}

const HistoryLayout: FunctionComponent<HistoryLayoutProps> = ({ solves, onDelete, onDeleteAll, className }) => {
	const onButtonClick = (idx: number) => {
		if (confirm("Are you sure you want to delete this solve?")) onDelete(idx);
	};
	const onDeleteAllButtonClick = () => {
		if (confirm("Are you sure you want to delete all solves?")) onDeleteAll();
	};

	return (
		<div className={className}>
			{solves.length > 1 && (
				<button onClick={onDeleteAllButtonClick} className="margin-style">
					Delete all
				</button>
			)}
			{solves
				.map((solve, idx) => (
					<div key={idx} className="margin-style">
						<SolveLayout solve={solve} idx={Math.abs(idx - solves.length)} />
						<button onClick={() => onButtonClick(idx)}>Delete</button>
					</div>
				))
				.toReversed()}
		</div>
	);
};

export default styled(HistoryLayout)`
	overflow: auto;
	max-height: 25rem;
	padding-left: 1rem;

	.margin-style {
		margin-bottom: 1rem;
	}
`;
