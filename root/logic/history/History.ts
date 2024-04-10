import Solve from "./model/Solve";

const LOCAL_STORAGE_HISTORY_NAME = "solveHistory";

export default class History {
	private _solves: Solve[];
	constructor(private _storage: Storage) {
		this._solves = this._getSolvesFromStorage();
	}

	saveSolve(solve: Solve) {
		this.solves.push(solve);
		this._syncSolves();
	}

	deleteSolve(idx: number) {
		this._solves.splice(idx, 1);
		this._syncSolves();
	}

	deleteAllSolves() {
		this._solves = [];
		this._syncSolves();
	}

	get solves(): Solve[] {
		return this._solves;
	}

	private _syncSolves() {
		this._storage.setItem(LOCAL_STORAGE_HISTORY_NAME, JSON.stringify(this.solves));
	}

	private _getSolvesFromStorage(): Solve[] {
		return JSON.parse(this._storage.getItem(LOCAL_STORAGE_HISTORY_NAME) ?? "[]");
	}
}
