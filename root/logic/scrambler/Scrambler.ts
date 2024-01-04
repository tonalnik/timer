export default abstract class Scrambler {
	private static _moves = [
		"U",
		"U'",
		"U2",
		"F",
		"F'",
		"F2",
		"L",
		"L'",
		"L2",
		"D",
		"D'",
		"D2",
		"B",
		"B'",
		"B2",
		"R",
		"R'",
		"R2",
	];
	constructor() {}

	static getScramble(length = 20) {
		const res: string[] = [];
		res.push(this._moves[this._getRandomInt(this._moves.length)]);
		for (let i = 0; i < length - 1; i++) {
			const avalibleMoves = this._moves.filter((x) => x[0] !== res[res.length - 1][0]);
			res.push(avalibleMoves[this._getRandomInt(avalibleMoves.length)]);
		}
		return res.join(" ");
	}

	private static _getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
}
