import { useState } from "react";

const App = () => {
	const [a, setA] = useState<number>(0);
	if (a == 5) throw new Error("test");
	return (
		<>
			<div>{a}</div>
			<button onClick={() => setA((a) => a + 1)}>Click +1</button>
		</>
	);
};

export default App;
