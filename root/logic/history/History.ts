import Solve from "./model/Solve";

const LOCAL_STORAGE_HISTORY_NAME = "solveHistory";

export default class History {
	constructor(private _storage: Storage) {}

	saveTime(scrumbleHistory: Solve) {
		const solves = this.getSolves();
		solves.push(scrumbleHistory);
		this.saveSolves(solves);
	}

	getSolves(): Solve[] {
		return JSON.parse(this._storage.getItem(LOCAL_STORAGE_HISTORY_NAME) ?? "[]");
	}

	saveSolves(solves: Solve[]) {
		this._storage.setItem(LOCAL_STORAGE_HISTORY_NAME, JSON.stringify(solves));
	}
}
