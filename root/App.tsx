import React, { useState } from "react";

const App = () => {
	const [a, setA] = useState<number>(0);
	return (
		<>
			<div>{a}</div>
			<button onClick={() => setA(a + 1)}>Click +1</button>
		</>
	);
};

export default App;
