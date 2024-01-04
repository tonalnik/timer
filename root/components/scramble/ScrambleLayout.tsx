import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import CubeLayout from "../cube/CubeLayout";

interface ScrambleLayoutProps {
	scramble: string;
	show?: boolean;
	className?: string;
}

const ScrambleLayout: FunctionComponent<ScrambleLayoutProps> = ({ scramble, className }) => {
	return (
		<div className={className}>
			<div className="scrumble">{scramble}</div>
			<div className="cube-layout">
				<CubeLayout scramble={scramble} />
			</div>
		</div>
	);
};

export default styled(ScrambleLayout)`
	background: black;

	opacity: ${(p) => (p.show === false ? "0" : "100%")};

	.scrumble {
		display: flex;
		justify-content: center;
		color: white;
		font-size: xx-large;
	}

	.cube-layout {
		display: flex;
		justify-content: center;
	}
`;
