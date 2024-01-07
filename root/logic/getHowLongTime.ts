const getHowLongTime = (timeFrom: number, timeTo: number): { m: string; s: string; ms: string } => {
	const time = new Date(timeTo - timeFrom);
	const m = time.getMinutes();
	const s = time.getSeconds();
	const ms = Math.floor(time.getMilliseconds() / 10);
	return { m: m.toString(), s: m === 0 ? s.toString() : convertToTwoDigitString(s), ms: convertToTwoDigitString(ms) };
};

export default getHowLongTime;

const convertToTwoDigitString = (t: number): string => (t < 10 ? "0" + t : t.toString());
