import { useEffect, useState } from "react";

const LOCAL_STORAGE_THEME = "is-light";
const INITIAL_VALUE = false;

const ThemeCheckbox = () => {
	const [checked, setChecked] = useState(getIsLight());

	function getIsLight() {
		const isLight = window.localStorage.getItem(LOCAL_STORAGE_THEME);
		return isLight ? isLight === "true" : INITIAL_VALUE;
	}

	function toggleIsLight() {
		const newValue = !getIsLight();
		window.localStorage.setItem(LOCAL_STORAGE_THEME, newValue.toString());
		document.body.className = newValue ? "light" : "dark";
		setChecked(newValue);
	}

	useEffect(() => {
		document.body.className = getIsLight() ? "light" : "dark";

		const keydownHandler = (e: KeyboardEvent) => {
			if (e.code === "KeyT") toggleIsLight();
		};

		document.addEventListener("keydown", keydownHandler);
		return () => document.removeEventListener("keydown", keydownHandler);
	}, []);

	return (
		<>
			<input checked={checked} type="checkbox" onClick={toggleIsLight} onChange={() => {}} />
			Light theme
		</>
	);
};

export default ThemeCheckbox;
