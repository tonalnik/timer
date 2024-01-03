import RubiksCube from "../RubiksCube";

describe("RubiksCube", () => {
	it("scramble cube", () => {
		const rubiksCube = new RubiksCube();
		rubiksCube.scramble("F' L2 R2 F D2 B L2 R2 F' D2 R2 B' D' B' D2 F' R U F' D2 R");
		expect(rubiksCube.cube).toEqual({
			u: ["white", "white", "red", "red", "white", "blue", "white", "green", "orange"],
			f: ["blue", "white", "white", "yellow", "green", "yellow", "orange", "orange", "yellow"],
			l: ["green", "green", "red", "yellow", "orange", "green", "yellow", "orange", "yellow"],
			d: ["green", "white", "red", "green", "yellow", "yellow", "red", "red", "orange"],
			b: ["green", "red", "orange", "white", "blue", "red", "blue", "blue", "blue"],
			r: ["blue", "orange", "white", "blue", "red", "blue", "green", "orange", "yellow"],
		});
	});
});
