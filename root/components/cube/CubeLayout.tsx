import RubiksCube from "@/root/logic/rubiksCube/RubiksCube";
import RubiksCubeModel from "@/root/logic/rubiksCube/model/RubiksCubeModel";
import styled from "@emotion/styled";
import { FunctionComponent, useRef, useState } from "react";
import CubeSide from "./CubeSide";

interface CubeSideProps {
	className?: string;
}

const CubeLayout: FunctionComponent<CubeSideProps> = ({ className }) => {
	const cube = useRef<RubiksCube>(new RubiksCube());
	const [cubeModel, setCubeModel] = useState<RubiksCubeModel>(cube.current.cube);

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
			<button
				onClick={() => {
					cube.current.scramble("B2 F2 L D2 F2 L' B2 R U2 L2 B' D2 U L B L2 R D' U L");
					setCubeModel({ ...cube.current.cube });
				}}
			>
				Scrumble
			</button>
		</div>
	);
};

export default styled(CubeLayout)`
	background: black;

	.top-side,
	.bottom-side {
		padding-left: 100px;
	}

	.horizontal-sides {
		display: flex;
	}
`;
