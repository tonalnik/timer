import RubiksCubeColors from "@/root/logic/rubiksCube/model/RubiksColors";
import { FunctionComponent } from "react";

interface CubeStickerProps {
	color: RubiksCubeColors;
}

const CubeSticker: FunctionComponent<CubeStickerProps> = ({ color }) => {
	const size = 25;
	const colors: { [key in RubiksCubeColors]: string } = {
		[RubiksCubeColors.W]: "var(--color-cube-white)",
		[RubiksCubeColors.G]: "var(--color-cube-green)",
		[RubiksCubeColors.R]: "var(--color-cube-red)",
		[RubiksCubeColors.Y]: "var(--color-cube-yellow)",
		[RubiksCubeColors.B]: "var(--color-cube-blue)",
		[RubiksCubeColors.O]: "var(--color-cube-orange)",
	};
	return <div style={{ width: size, height: size, background: colors[color] }} />;
};

export default CubeSticker;
