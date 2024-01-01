import getHowLongTime from "@/root/ui-logic/getHowLongTime";
import { FunctionComponent, useEffect, useRef, useState } from "react";

const INTERVAL_DELAY = 25;

const Timer: FunctionComponent = () => {
	const [miliSeconds, setMiliSeconds] = useState("00");
	const [seconds, setSeconds] = useState("00");
	const [minutes, setMinutes] = useState("00");
	const [timeColor, setTimeColor] = useState<"green" | "red">(null);
	const [isTimerProcess, setIsTimerProcess] = useState(false);

	const timeFrom = useRef<number>(null);
	const isSpaceCancel = useRef<boolean>(false);
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
		setIsTimerProcess(true);
	};

	const onStop = () => {
		const timeTo = new Date().getTime();
		clearInterval(intervalId.current);
		setTimer(timeFrom.current, timeTo);
		timeFrom.current = null;
		setIsTimerProcess(false);
	};

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			switch (e.key) {
				case " ": {
					setTimeColor("red");
					if (isTimerProcess) {
						onStop();
						isSpaceCancel.current = true;
					}
					break;
				}
				default: {
					if (isTimerProcess) onStop();
					break;
				}
			}
		};

		const keyUpHandler = (e: KeyboardEvent) => {
			switch (e.key) {
				case " ": {
					setTimeColor(null);
					if (!isSpaceCancel.current) onStart();
					isSpaceCancel.current = false;
					break;
				}
			}
		};

		window.addEventListener("keydown", keyDownHandler);
		window.addEventListener("keyup", keyUpHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
			window.removeEventListener("keyup", keyUpHandler);
		};
	});

	return (
		<div className="timer-layout">
			<div className="timer" style={{ width: 600 }}>
				<div className="time" style={{ fontSize: 150, color: timeColor }}>
					<span>{minutes}</span>:<span>{seconds}</span>:<span>{miliSeconds}</span>
				</div>
				<div className="buttons">
					<button onClick={onStart} disabled={isTimerProcess}>
						Start
					</button>
					<button onClick={onStop} disabled={!isTimerProcess}>
						Stop
					</button>
				</div>
			</div>
		</div>
	);
};

export default Timer;
