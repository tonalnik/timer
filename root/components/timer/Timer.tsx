import getHowLongTime from "@/root/logic/getHowLongTime";
import styled from "@emotion/styled";
import { FunctionComponent, useEffect, useRef, useState } from "react";

const INTERVAL_DELAY = 25;

interface TimerProps {
	onStart?: VoidFunction;
	onStop?: VoidFunction;
	onPrepare?: VoidFunction;
	className?: string;
}

const Timer: FunctionComponent<TimerProps> = ({
	onStart: onStartCallback,
	onStop: onStopCallback,
	onPrepare: onPrepareCallback,
	className,
}) => {
	const [miliSeconds, setMiliSeconds] = useState("00");
	const [seconds, setSeconds] = useState("0");
	const [minutes, setMinutes] = useState("0");

	const [timeColor, setTimeColor] = useState<"green" | "red">(null);
	const [isTimerProcess, setIsTimerProcess] = useState(false);

	const timeFrom = useRef<number>(null);
	const intervalId = useRef<string | number | NodeJS.Timeout>(null);

	const isSpaceCancel = useRef<boolean>(false);
	const hasPrepare = useRef<boolean>(false);

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
		onStartCallback?.();
	};

	const onPrepare = () => {
		setTimeColor("green");
		setTimer(0, 0);
		onPrepareCallback?.();
	};

	const onStop = () => {
		const timeTo = new Date().getTime();
		clearInterval(intervalId.current);
		setTimer(timeFrom.current, timeTo);
		timeFrom.current = null;
		setIsTimerProcess(false);
		onStopCallback?.();
	};

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			if (e.key !== " ") {
				if (isTimerProcess) onStop();
				return;
			}

			if (e.repeat) {
				if (!isSpaceCancel.current && !hasPrepare.current) {
					hasPrepare.current = true;
					onPrepare();
				}
			} else setTimeColor("red");

			if (isTimerProcess) {
				onStop();
				isSpaceCancel.current = true;
			}
		};

		const keyUpHandler = (e: KeyboardEvent) => {
			if (e.key !== " ") {
				hasPrepare.current = false;
				return;
			}

			setTimeColor(null);
			if (!isSpaceCancel.current && hasPrepare.current) onStart();
			isSpaceCancel.current = false;
			hasPrepare.current = false;
		};

		window.addEventListener("keydown", keyDownHandler);
		window.addEventListener("keyup", keyUpHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
			window.removeEventListener("keyup", keyUpHandler);
		};
	});

	const getTimeColor = () => (timeColor ? `var(--color-timer-${timeColor})` : null);

	return (
		<div className={"timer-layout " + className}>
			<div className="timer">
				<div className="time" style={{ color: getTimeColor() }}>
					<span>
						{minutes == "0" ? null : minutes + "."}
						{seconds}.{miliSeconds}
					</span>
				</div>
				{/* <div className="buttons">
					<button onClick={onStart} disabled={isTimerProcess}>
						Start
					</button>
					<button onClick={onStop} disabled={!isTimerProcess}>
						Stop
					</button>
				</div> */}
			</div>
		</div>
	);
};

export default styled(Timer)`
	.timer {
		font-size: 150px;
	}
`;
