import { useEffect, useState } from "react";

const localStorageTheme = "is-light";
const initialValue = false;

const ThemeCheckbox = () => {
	const [checked, setChecked] = useState(getIsLight());

	function getIsLight() {
		const isLight = window.localStorage.getItem(localStorageTheme);
		return isLight ? isLight === "true" : initialValue;
	}

	function toggleIsLight() {
		const newValue = !getIsLight();
		window.localStorage.setItem(localStorageTheme, newValue.toString());
		document.body.className = newValue ? "light" : "dark";
		setChecked(newValue);
	}

	useEffect(() => {
		document.body.className = getIsLight() ? "light" : "dark";

		const keydownHandler = (e: KeyboardEvent) => {
			if (e.code === "KeyT") toggleIsLight();
		};

		document.addEventListener("keydown", keydownHandler);
		return () => document.addEventListener("keydown", keydownHandler);
	}, []);

	return (
		<>
			<input checked={checked} type="checkbox" onClick={toggleIsLight} />
			Light theme
		</>
	);
};

export default ThemeCheckbox;
