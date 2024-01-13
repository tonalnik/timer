import Tippy from "@tippyjs/react";
import { FunctionComponent, JSXElementConstructor, ReactElement, ReactNode } from "react";

interface TooltipProps {
	content: ReactNode;
	children: ReactElement<any, string | JSXElementConstructor<any>>;
	onHidden?: VoidFunction;
}

const Tooltip: FunctionComponent<TooltipProps> = ({ children, content, onHidden }) => {
	return (
		<Tippy
			content={typeof content === "string" ? <StringContent content={content} /> : content}
			hideOnClick={false}
			onHidden={onHidden}
		>
			{children}
		</Tippy>
	);
};

export default Tooltip;

const StringContent: FunctionComponent<{ content: string }> = ({ content }) => {
	return (
		<span
			style={{
				color: "var(--color-secondary)",
				background: "var(--color-primary)",
				padding: "0.5rem",
				borderRadius: "0.5rem",
				boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
			}}
		>
			{content}
		</span>
	);
};
