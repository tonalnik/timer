import styled from "@emotion/styled";
import MainApp from "./components/MainApp";
import Version from "./components/Version";

const StytledDiv = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

const App = () => {
	return (
		<>
			<StytledDiv>
				<div className="main">
					<MainApp />
				</div>
				<Version />
			</StytledDiv>
		</>
	);
};

export default App;
