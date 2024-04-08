import { useMemo, useState } from "react";
import Timer from "../components/timer/Timer";
import History from "../logic/history/History";
import Solve from "../logic/history/model/Solve";
import Scrambler from "../logic/scrambler/Scrambler";
import HistoryLayout from "./history/HistoryLayout";
import ScrambleLayout from "./scumble/ScrumbleLayout";
import ThemeCheckbox from "./theme/ThemeCheckbox";

const MainApp = () => {
	const history = useMemo(() => new History(window.localStorage), []);
	const [solves, setSolves] = useState<Solve[]>(history.getSolves());

	const [scramble, setScramble] = useState(Scrambler.getScramble());
	const [showScramble, setShowScramble] = useState(true);
	const [showTimerDuringSolve, setShowTimerDuringSolve] = useState(true);

	const onPrepare = () => {
		setShowScramble(false);
	};

	const onStop = (time: string) => {
		setShowScramble(true);
		setScramble(Scrambler.getScramble());
		history.saveTime({ dateTimeStamp: new Date().getTime(), scramble, time });
		setSolves(history.getSolves());
	};

	return (
		<>
			<Timer onPrepare={onPrepare} onStop={onStop} showTimerDuringSolve={showTimerDuringSolve} />
			<ScrambleLayout scramble={scramble} show={showScramble} />
			{showScramble && (
				<div>
					<ThemeCheckbox />
					<div style={{ marginBottom: "1rem" }}>
						<input
							checked={showTimerDuringSolve}
							type="checkbox"
							onClick={() => setShowTimerDuringSolve((x) => !x)}
							onChange={() => {}}
						/>
						Show timer during solve
					</div>
					<HistoryLayout solves={solves} />
				</div>
			)}
		</>
	);
};

export default MainApp;
