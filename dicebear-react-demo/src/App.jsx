import React, { useState } from "react";
import "./App.css";

function App() {
	const [inputVal, setInputVal] = useState("");
	const [apiResponse, setApiResponse] = useState("");

	React.useEffect(() => {
		// Debounce the api call on input change very frequently
		const debouncedFunction = setTimeout(async () => {
			const URL = `https://avatars.dicebear.com/api/male/${inputVal}.svg`;
			const resp = await fetch(URL);
			if (resp.ok) {
				console.log(await resp);
				setApiResponse(resp.url);
			}
		}, 500);

		return () => clearTimeout(debouncedFunction);
	}, [inputVal]);

	return (
		<div className="App">
			<h2>Input random text here 🔽</h2>
			<input
				type={"text"}
				defaultValue={inputVal}
				onChange={(e) => setInputVal(e.target.value)}
			/>
			<div>
				Your seed is: {inputVal} and API Endpoint: {apiResponse}
			</div>
			<img src={apiResponse} alt="avatar" className="avatar" />
			<footer>Dicebear Codesandbox by Ankur Paul (nooobcoder)</footer>
		</div>
	);
}

export default App;
