import React, { useState, useCallback } from "react";

import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";
import "./App.css";

const App = () => {
	const [allowToggle, setAllowToggle] = useState(false);
	const [showParagraph, setShowParagraph] = useState(false);

	console.log("APP RUNNING");

	/* useCallback() Returns a memoized callback. [https://reactjs.org/docs/hooks-reference.html#usecallback]

	Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the 	callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders 
	*/
	const toggleParagraphHandler = useCallback(() => {
		if (allowToggle)
			setShowParagraph((prevShowParagraph) => !prevShowParagraph);
	}, [allowToggle]);

	const allowToggleHandler = () => setAllowToggle(true);

	return (
		<div className="app">
			<h1>Hi there!</h1>
			<DemoOutput show={showParagraph} />
			<Button onClick={allowToggleHandler}>Allow Toggling!</Button>
			<Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
		</div>
	);
};

export default App;
