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
	const [solves, setSolves] = useState<Solve[]>(history.solves);

	const [scramble, setScramble] = useState(Scrambler.getScramble());
	const [showScramble, setShowScramble] = useState(true);
	const [showTimerDuringSolve, setShowTimerDuringSolve] = useState(true);

	const onPrepare = () => {
		setShowScramble(false);
	};

	const onStop = (time: string) => {
		setShowScramble(true);
		setScramble(Scrambler.getScramble());
		history.saveSolve({ dateTimeStamp: new Date().getTime(), scramble, time });
		setSolves([...history.solves]);
	};

	const onDelete = (idx: number) => {
		history.deleteSolve(idx);
		setSolves([...history.solves]);
	};

	const onDelelteAll = () => {
		history.deleteAllSolves();
		setSolves([]);
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
					<HistoryLayout solves={solves} onDelete={onDelete} onDeleteAll={onDelelteAll} />
				</div>
			)}
		</>
	);
};

export default MainApp;
