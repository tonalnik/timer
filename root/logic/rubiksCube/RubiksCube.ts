import C from "./RubiksColors";

export default class RubiksCube {
	private _cube: {
		u: C[];
		f: C[];
		l: C[];
		d: C[];
		b: C[];
		r: C[];
	};

	private _moves = {
		U: this.up,
		D: this.down,
		L: this.left,
		R: this.right,
		F: this.front,
		B: this.back,
	};

	constructor() {
		this._initCube();
	}

	get cube() {
		return this._cube;
	}

	scramble(scrambleString: string) {
		const moves = scrambleString.split(" ");
		moves.forEach((move) => {
			const isDouble = move[1] === "2";
			const isClockwise = move[1] !== "'";
			const m = this._moves[move[0] as keyof typeof this._moves];
			if (isDouble) m.call(this), m.call(this);
			else m.call(this, isClockwise);
		});
	}

	up(clockwise = true) {
		const f = [...this._cube.f];
		const l = [...this._cube.l];
		const b = [...this._cube.b];
		const r = [...this._cube.r];

		this._turn(this._cube.u, clockwise);

		this._cube.f[0] = clockwise ? r[0] : l[0];
		this._cube.f[1] = clockwise ? r[1] : l[1];
		this._cube.f[2] = clockwise ? r[2] : l[2];

		this._cube.l[0] = clockwise ? f[0] : b[0];
		this._cube.l[1] = clockwise ? f[1] : b[1];
		this._cube.l[2] = clockwise ? f[2] : b[2];

		this._cube.b[0] = clockwise ? l[0] : r[0];
		this._cube.b[1] = clockwise ? l[1] : r[1];
		this._cube.b[2] = clockwise ? l[2] : r[2];

		this._cube.r[0] = clockwise ? b[0] : f[0];
		this._cube.r[1] = clockwise ? b[1] : f[1];
		this._cube.r[2] = clockwise ? b[2] : f[2];
	}

	down(clockwise = true) {
		const f = [...this._cube.f];
		const l = [...this._cube.l];
		const b = [...this._cube.b];
		const r = [...this._cube.r];

		this._turn(this._cube.d, clockwise);

		this._cube.f[6] = clockwise ? l[6] : r[6];
		this._cube.f[7] = clockwise ? l[7] : r[7];
		this._cube.f[8] = clockwise ? l[8] : r[8];

		this._cube.l[6] = clockwise ? b[6] : f[6];
		this._cube.l[7] = clockwise ? b[7] : f[7];
		this._cube.l[8] = clockwise ? b[8] : f[8];

		this._cube.b[6] = clockwise ? r[6] : l[6];
		this._cube.b[7] = clockwise ? r[7] : l[7];
		this._cube.b[8] = clockwise ? r[8] : l[8];

		this._cube.r[6] = clockwise ? f[6] : b[6];
		this._cube.r[7] = clockwise ? f[7] : b[7];
		this._cube.r[8] = clockwise ? f[8] : b[8];
	}

	left(clockwise = true) {
		const u = [...this._cube.u];
		const f = [...this._cube.f];
		const d = [...this._cube.d];
		const b = [...this._cube.b];

		this._turn(this._cube.l, clockwise);

		this._cube.u[0] = clockwise ? b[8] : f[0];
		this._cube.u[3] = clockwise ? b[5] : f[3];
		this._cube.u[6] = clockwise ? b[2] : f[6];

		this._cube.f[0] = clockwise ? u[0] : d[0];
		this._cube.f[3] = clockwise ? u[3] : d[3];
		this._cube.f[6] = clockwise ? u[6] : d[6];

		this._cube.d[0] = clockwise ? f[0] : b[8];
		this._cube.d[3] = clockwise ? f[3] : b[5];
		this._cube.d[6] = clockwise ? f[6] : b[2];

		this._cube.b[2] = clockwise ? d[6] : u[6];
		this._cube.b[5] = clockwise ? d[3] : u[3];
		this._cube.b[8] = clockwise ? d[0] : u[0];
	}

	right(clockwise = true) {
		const u = [...this._cube.u];
		const f = [...this._cube.f];
		const d = [...this._cube.d];
		const b = [...this._cube.b];

		this._turn(this._cube.r, clockwise);

		this._cube.u[2] = clockwise ? f[2] : b[6];
		this._cube.u[5] = clockwise ? f[5] : b[3];
		this._cube.u[8] = clockwise ? f[8] : b[0];

		this._cube.f[2] = clockwise ? d[2] : u[2];
		this._cube.f[5] = clockwise ? d[5] : u[5];
		this._cube.f[8] = clockwise ? d[8] : u[8];

		this._cube.d[2] = clockwise ? b[6] : f[2];
		this._cube.d[5] = clockwise ? b[3] : f[5];
		this._cube.d[8] = clockwise ? b[0] : f[8];

		this._cube.b[0] = clockwise ? u[8] : d[8];
		this._cube.b[3] = clockwise ? u[5] : d[5];
		this._cube.b[6] = clockwise ? u[2] : d[2];
	}

	front(clockwise = true) {
		const u = [...this._cube.u];
		const r = [...this._cube.r];
		const d = [...this._cube.d];
		const l = [...this._cube.l];

		this._turn(this._cube.f, clockwise);

		this._cube.u[6] = clockwise ? l[8] : r[0];
		this._cube.u[7] = clockwise ? l[5] : r[3];
		this._cube.u[8] = clockwise ? l[2] : r[6];

		this._cube.r[0] = clockwise ? u[6] : d[2];
		this._cube.r[3] = clockwise ? u[7] : d[1];
		this._cube.r[6] = clockwise ? u[8] : d[0];

		this._cube.d[0] = clockwise ? r[6] : l[2];
		this._cube.d[1] = clockwise ? r[3] : l[5];
		this._cube.d[2] = clockwise ? r[0] : l[8];

		this._cube.l[2] = clockwise ? d[0] : u[8];
		this._cube.l[5] = clockwise ? d[1] : u[7];
		this._cube.l[8] = clockwise ? d[2] : u[6];
	}

	back(clockwise = true) {
		const u = [...this._cube.u];
		const r = [...this._cube.r];
		const d = [...this._cube.d];
		const l = [...this._cube.l];

		this._turn(this._cube.b, clockwise);

		this._cube.u[0] = clockwise ? r[2] : l[6];
		this._cube.u[1] = clockwise ? r[5] : l[3];
		this._cube.u[2] = clockwise ? r[8] : l[0];

		this._cube.r[2] = clockwise ? d[8] : u[0];
		this._cube.r[5] = clockwise ? d[7] : u[1];
		this._cube.r[8] = clockwise ? d[6] : u[2];

		this._cube.d[6] = clockwise ? l[0] : r[8];
		this._cube.d[7] = clockwise ? l[3] : r[5];
		this._cube.d[8] = clockwise ? l[6] : r[2];

		this._cube.l[0] = clockwise ? u[2] : d[6];
		this._cube.l[3] = clockwise ? u[1] : d[7];
		this._cube.l[6] = clockwise ? u[0] : d[8];
	}

	private _initCube() {
		const u = this._getFullColorSide(C.W);
		const f = this._getFullColorSide(C.G);
		const l = this._getFullColorSide(C.O);
		const d = this._getFullColorSide(C.Y);
		const b = this._getFullColorSide(C.B);
		const r = this._getFullColorSide(C.R);
		this._cube = { u, f, l, d, b, r };
	}

	private _getFullColorSide(color: C): C[] {
		return [color, color, color, color, color, color, color, color, color];
	}

	private _turn(side: C[], clockwise: boolean) {
		const sideBefore = [...side];
		if (clockwise) {
			side[0] = sideBefore[6];
			side[1] = sideBefore[3];
			side[2] = sideBefore[0];
			side[3] = sideBefore[7];
			side[5] = sideBefore[1];
			side[6] = sideBefore[8];
			side[7] = sideBefore[5];
			side[8] = sideBefore[2];
		} else {
			side[0] = sideBefore[2];
			side[1] = sideBefore[5];
			side[2] = sideBefore[8];
			side[3] = sideBefore[1];
			side[5] = sideBefore[7];
			side[6] = sideBefore[0];
			side[7] = sideBefore[3];
			side[8] = sideBefore[6];
		}
	}
}
