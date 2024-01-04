import RubiksCube from "@/root/logic/rubiksCube/RubiksCube";
import styled from "@emotion/styled";
import { FunctionComponent, useMemo } from "react";
import CubeSide from "./CubeSide";

interface CubeSideProps {
	scramble: string;
	className?: string;
}

const CubeLayout: FunctionComponent<CubeSideProps> = ({ scramble, className }) => {
	const cubeModel = useMemo(() => {
		const cube = new RubiksCube();
		cube.scramble(scramble);
		return cube.cube;
	}, [scramble]);

	return (
		<div className={className}>
			<div className="top-side">
				<CubeSide side={cubeModel.u} />
			</div>
			<div className="horizontal-sides">
				<CubeSide side={cubeModel.l} />
				<CubeSide side={cubeModel.f} />
				<CubeSide side={cubeModel.r} />
				<CubeSide side={cubeModel.b} />
			</div>
			<div className="bottom-side">
				<CubeSide side={cubeModel.d} />
			</div>
		</div>
	);
};

export default styled(CubeLayout)`
	.top-side,
	.bottom-side {
		padding-left: 100px;
	}

	.horizontal-sides {
		display: flex;
	}
`;
