import RubiksCubeColors from "@/root/logic/rubiksCube/RubiksColors";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import CubeSticker from "./CubeSticker";

interface CubeSideProps {
	side: RubiksCubeColors[];
	className?: string;
}

const SIDE_SIZE = 100;

const CubeSide: FunctionComponent<CubeSideProps> = ({ side, className }) => {
	return (
		<div className={className}>
			<div className="layer">
				<CubeSticker color={side[0]} />
				<CubeSticker color={side[1]} />
				<CubeSticker color={side[2]} />
			</div>
			<div className="layer">
				<CubeSticker color={side[3]} />
				<CubeSticker color={side[4]} />
				<CubeSticker color={side[5]} />
			</div>
			<div className="layer">
				<CubeSticker color={side[6]} />
				<CubeSticker color={side[7]} />
				<CubeSticker color={side[8]} />
			</div>
		</div>
	);
};

export default styled(CubeSide)`
	width: ${() => SIDE_SIZE + "px"};
	height: ${() => SIDE_SIZE + "px"};
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	.layer {
		display: flex;
		justify-content: space-around;
	}
`;
