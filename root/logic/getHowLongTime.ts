const getHowLongTime = (timeFrom: number, timeTo: number): { ms: string; s: string; m: string } => {
	const time = new Date(timeTo - timeFrom);
	return {
		ms: convertToString(Math.floor(time.getMilliseconds() / 10)),
		s: time.getSeconds().toString(),
		m: time.getMinutes().toString(),
	};
};

export default getHowLongTime;

const convertToString = (t: number): string => (t < 10 ? "0" + t : t.toString());
