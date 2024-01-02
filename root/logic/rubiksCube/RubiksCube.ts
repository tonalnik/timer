import C from "./RubiksColors";

export default class RubiksCube {
	private _cube: {
		u: C[][];
		f: C[][];
		l: C[][];
		d: C[][];
		b: C[][];
		r: C[][];
	};
	constructor() {
		this._initCube();
	}

	up() {
		const f = this._cube.f[0];
		const l = this._cube.l[0];
		const b = this._cube.b[0];
		const r = this._cube.r[0];
        
	}

	private _initCube() {
		const u = this._getFullColorSide(C.W);
		const f = this._getFullColorSide(C.G);
		const l = this._getFullColorSide(C.R);
		const d = this._getFullColorSide(C.Y);
		const b = this._getFullColorSide(C.B);
		const r = this._getFullColorSide(C.O);
		this._cube = { u, f, l, d, b, r };
	}

	private _getFullColorSide(color: C): C[][] {
		return [
			[color, color, color],
			[color, color, color],
			[color, color, color],
		];
	}
}
