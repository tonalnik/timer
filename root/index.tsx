import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./components/App";
// import Helmet from "./components/Helmet";

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<HelmetProvider>
			{/* <Helmet /> */}
			<App />
		</HelmetProvider>
	</StrictMode>
);
