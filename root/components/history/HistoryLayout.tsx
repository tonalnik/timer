import styled from "@emotion/styled";
import { useEffect, type FunctionComponent } from "react";
import type Solve from "@/root/logic/history/model/Solve";
import SolveLayout from "./SolveLayout";

interface HistoryLayoutProps {
	solves: Solve[];
	onDelete?: (idx: number) => void;
	onDeleteAll?: () => void;
	className?: string;
}

const HistoryLayout: FunctionComponent<HistoryLayoutProps> = ({
	solves,
	onDelete,
	onDeleteAll,
	className,
}) => {
	const onButtonClick = (idx: number) => {
		if (confirm("Are you sure you want to delete this solve?"))
			onDelete(idx);
	};
	const onDeleteAllButtonClick = () => {
		if (confirm("Are you sure you want to delete all solves?"))
			onDeleteAll();
	};

	useEffect(() => {
		const keydownHandler = (e: KeyboardEvent) => {
			if (!solves?.length) return;
			if (e.code === "KeyD") {
				onButtonClick(solves.length - 1);
			}
		};
		window.addEventListener("keydown", keydownHandler);
		return () => {
			window.removeEventListener("keydown", keydownHandler);
		};
	}, [solves.length]);

	return (
		<div className={className}>
			{solves.length > 1 && (
				<button
					onClick={onDeleteAllButtonClick}
					className="margin-style"
				>
					Delete all
				</button>
			)}
			{solves
				.map((solve, idx) => (
					<div key={idx} className="margin-style">
						<SolveLayout
							solve={solve}
							idx={Math.abs(idx - solves.length)}
						/>
						<button onClick={() => onButtonClick(idx)}>
							Delete
						</button>
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
