import getHowLongTime from "@/root/ui-logic/getHowLongTime";
import { FunctionComponent, useEffect, useRef, useState } from "react";

const INTERVAL_DELAY = 25;

const Timer: FunctionComponent = () => {
	const [miliSeconds, setMiliSeconds] = useState("00");
	const [seconds, setSeconds] = useState("00");
	const [minutes, setMinutes] = useState("00");

	const timeFrom = useRef<number>(null);
	const [isTimerProcess, setIsTimerProcess] = useState(false);
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
		const handler = (e: KeyboardEvent) => {
			switch (e.key) {
				case " ": {
					isTimerProcess ? onStop() : onStart();
					break;
				}
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	});

	return (
		<div className="timer-layout">
			<div className="timer">
				<div className="time" style={{ fontSize: 150 }}>
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
