import getHowLongTime from "@/root/ui-logic/getHowLongTime";
import { FunctionComponent, useRef, useState } from "react";

const INTERVAL_DELAY = 50;

const Timer: FunctionComponent = () => {
	const [miliSeconds, setMiliSeconds] = useState("00");
	const [seconds, setSeconds] = useState("00");
	const [minutes, setMinutes] = useState("00");

	const [disableStart, setDisableStart] = useState(false);
	const [disableStop, setDisableStop] = useState(true);
	const [disableReset, setDisableReset] = useState(true);

	const timeFrom = useRef<number>(null);
	const intervalId = useRef<string | number | NodeJS.Timeout>(null);

	const setTimer = (timeFrom: number, timeTo: number) => {
		const time = getHowLongTime(timeFrom, timeTo);
		setMiliSeconds(time.ms);
		setSeconds(time.s);
		setMinutes(time.m);
	};

	const onStart = () => {
		timeFrom.current = new Date().getTime();
		intervalId.current = setInterval(() => {
			setTimer(timeFrom.current, new Date().getTime());
		}, INTERVAL_DELAY);
		setDisableStart(true);
		setDisableStop(false);
		setDisableReset(false);
	};

	const onStop = () => {
		const timeTo = new Date().getTime();
		clearInterval(intervalId.current);
		setTimer(timeFrom.current, timeTo);
		setDisableStart(false);
		setDisableStop(true);
		timeFrom.current = null;
	};

	const onReset = () => {
		setMiliSeconds("00");
		setSeconds("00");
		setMinutes("00");

		setDisableStart(false);
		setDisableStop(true);
		setDisableReset(true);
		clearInterval(intervalId.current);
		timeFrom.current = null;
	};

	return (
		<div className="timer-layout">
			<div className="timer">
				<div className="time" style={{ fontSize: 150 }}>
					<span>{minutes}</span>:<span>{seconds}</span>:<span>{miliSeconds}</span>
				</div>
				<div className="buttons">
					<button onClick={onStart} disabled={disableStart}>
						Start
					</button>
					<button onClick={onStop} disabled={disableStop}>
						Stop
					</button>
					<button onClick={onReset} disabled={disableReset}>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
};

export default Timer;
