import styled from "@emotion/styled";
import { FunctionComponent, useState } from "react";
import Tooltip from "../atoms/Tooltip";
import CubeLayout from "../cube/CubeLayout";

interface ScrambleLayoutProps {
	scramble: string;
	show?: boolean;
	className?: string;
}

const ScrambleLayout: FunctionComponent<ScrambleLayoutProps> = ({ scramble, className }) => {
	const [clickedToCopy, setClickedToCopy] = useState(false);

	return (
		<div className={"scumble-layout " + className}>
			<Tooltip
				content={clickedToCopy ? "Скопировано!" : "Нажмите, чтобы скопировать"}
				onHidden={() => setClickedToCopy(false)}
			>
				<div
					className="scrumble"
					style={{ cursor: "pointer" }}
					onClick={() => {
						setClickedToCopy(true);
						void navigator.clipboard.writeText(scramble);
					}}
				>
					{scramble}
				</div>
			</Tooltip>
			<div className="cube-layout">
				<CubeLayout scramble={scramble} />
			</div>
		</div>
	);
};

export default styled(ScrambleLayout)`
	opacity: ${(p) => (p.show === false ? "0" : "100%")};
	visibility: ${(p) => (p.show === false ? "hidden" : "visible")};

	.scrumble {
		display: flex;
		justify-content: center;
		color: var(--color-primary);
		font-size: xx-large;
		word-spacing: 0.5rem;
	}

	.cube-layout {
		display: flex;
		justify-content: center;
	}
`;
