import RubiksCubeColors from "@/root/logic/rubiksCube/RubiksColors";
import { FunctionComponent } from "react";

interface CubeStickerProps {
	color: RubiksCubeColors;
}

const CubeSticker: FunctionComponent<CubeStickerProps> = ({ color }) => {
	const size = 25;
	return <div style={{ width: size, height: size, background: color }} />;
};

export default CubeSticker;
