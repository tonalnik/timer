import { useState } from "react";
import Timer from "../components/timer/Timer";
import Scrambler from "../logic/scrambler/Scrambler";
import ScrambleLayout from "./scumble/ScrumbleLayout";
import ThemeCheckbox from "./theme/ThemeCheckbox";

const MainApp = () => {
	const [scramble, setScramble] = useState(Scrambler.getScramble());
	const [showScramble, setShowScramble] = useState(true);

	const onPrepare = () => {
		setShowScramble(false);
	};

	const onStop = () => {
		setShowScramble(true);
		setScramble(Scrambler.getScramble());
	};

	return (
		<>
			<Timer onPrepare={onPrepare} onStop={onStop} />
			<ScrambleLayout scramble={scramble} show={showScramble} />
			{showScramble && <ThemeCheckbox />}
		</>
	);
};

export default MainApp;
