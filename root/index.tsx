import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import Helmet from "./Helmet";

document.body.innerHTML = '<div id="app"></div>';
const root = createRoot(document.getElementById("app"));
root.render(
	<HelmetProvider>
		<Helmet />
		<App />
	</HelmetProvider>
);
