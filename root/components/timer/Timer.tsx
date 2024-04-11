import getHowLongTime from "@/root/logic/getHowLongTime";
import styled from "@emotion/styled";
import { FunctionComponent, useEffect, useRef, useState } from "react";

const INTERVAL_DELAY = 25;

interface TimerProps {
	onStart?: VoidFunction;
	onStop?: (time: string) => void;
	onPrepare?: VoidFunction;
	showTimerDuringSolve?: boolean;
	className?: string;
}

const Timer: FunctionComponent<TimerProps> = ({
	onStart: onStartCallback,
	onStop: onStopCallback,
	onPrepare: onPrepareCallback,
	showTimerDuringSolve = true,
	className,
}) => {
	const [miliSeconds, setMiliSeconds] = useState("00");
	const [seconds, setSeconds] = useState("0");
	const [minutes, setMinutes] = useState("0");

	const [timeColor, setTimeColor] = useState<"green" | "red">(null);
	const [showTimer, setShowTimer] = useState(true);

	const timeFrom = useRef<number>(null);
	const intervalId = useRef<string | number | NodeJS.Timeout>(null);

	const hasPrepare = useRef<boolean>(false);
	const isTimerProcess = useRef<boolean>(false);

	const setTimer = (timeFrom: number, timeTo: number) => {
		const time = getHowLongTime(timeFrom, timeTo);
		setMiliSeconds(time.ms);
		setSeconds(time.s);
		setMinutes(time.m);
	};

	const onStart = () => {
		setShowTimer(showTimerDuringSolve);
		timeFrom.current = new Date().getTime();
		intervalId.current = setInterval(() => {
			setTimer(timeFrom.current, new Date().getTime());
		}, INTERVAL_DELAY);
		isTimerProcess.current = true;
		onStartCallback?.();
	};

	const onPrepare = () => {
		setTimeColor("green");
		setTimer(0, 0);
		onPrepareCallback?.();
	};

	const onStop = () => {
		const timeTo = new Date().getTime();
		isTimerProcess.current = false;
		clearInterval(intervalId.current);

		const time = getHowLongTime(timeFrom.current, timeTo);
		setShowTimer(true);
		setTimer(timeFrom.current, timeTo);
		timeFrom.current = null;
		onStopCallback?.(getTimeView(time.m, time.s, time.ms));
	};

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			if (isTimerProcess.current) {
				onStop();
				return;
			}

			if (e.key !== " ") return;

			if (e.repeat) {
				if (!hasPrepare.current) {
					hasPrepare.current = true;
					onPrepare();
				}
			} else setTimeColor("red");
		};

		const keyUpHandler = (e: KeyboardEvent) => {
			if (e.key !== " ") return;

			setTimeColor(null);
			if (hasPrepare.current) onStart();
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

	const getTimeView = (m: string, s: string, ms: string) => (m == "0" ? "" : m + ".") + s + "." + ms;

	return (
		<div className={"timer-layout " + className}>
			<div className="timer">
				<div className="time" style={{ color: getTimeColor() }}>
					<span>{showTimer ? getTimeView(minutes, seconds, miliSeconds) : "Solving"}</span>
				</div>
			</div>
		</div>
	);
};

export default styled(Timer)`
	.timer {
		font-size: 150px;
	}
`;
