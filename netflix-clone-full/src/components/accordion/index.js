import { createContext, useContext, useState } from "react";

import {
	Container,
	Item,
	Inner,
	Header,
	Title,
	Body,
	Frame,
} from "./styles/accordion";

const ToggleContext = createContext();

const Accordion = ({ children, ...restProps }) => {
	return (
		<Container {...restProps}>
			<Inner>{children}</Inner>
		</Container>
	);
};

Accordion.Title = ({ children, ...restProps }) => (
	<Title {...restProps}>{children}</Title>
);
Accordion.Frame = ({ children, ...restProps }) => (
	<Frame {...restProps}>{children}</Frame>
);
Accordion.Item = function AccordionItem({ children, ...restProps }) {
	const [toggleShow, setToggleShow] = useState(false);
	return (
		<ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
			<Item {...restProps}>{children}</Item>
		</ToggleContext.Provider>
	);
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
	const { toggleShow, setToggleShow } = useContext(ToggleContext);

	return (
		<Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
			{children}
			{toggleShow ? (
				<img src="/images/icons/close-slim.png" alt="Close" />
			) : (
				<img src="/images/icons/add.png" alt="Open" />
			)}
		</Header>
	);
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
	const { toggleShow } = useContext(ToggleContext);

	/* return toggleShow ? <Body {...restProps}>{children}</Body> : null; */

	return (
		<Body className={toggleShow ? "open" : "closed"} {...restProps}>
			<span>{children}</span>
		</Body>
	);
};

export default Accordion;
