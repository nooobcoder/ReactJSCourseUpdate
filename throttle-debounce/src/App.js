import {
	useRef,
	useState,
	// useEffect,
} from "react";

import "./App.css";
import TallContent from "./components/TallContent";

function App() {
	const [scrollHandleCount, setScrollHandleCount] = useState(0);
	// Number of event handler calls with Throttle
	const [scrollThrottleHandleCount, setScrollThrottleHandleCount] =
		useState(0);
	const [scrollDebounceHandleCount, setScrollDebounceHandleCount] =
		useState(0);
	// Keeping the state in progress
	const throttleInProgress = useRef();
	const timerDebounceRef = useRef();

	const handleUsualScroll = () => {
		setScrollHandleCount(scrollHandleCount + 1);
	};

	// This function implements the main throttling logic
	const handleThrottleScroll = () => {
		if (throttleInProgress.current) return;
		throttleInProgress.current = true;
		setTimeout(() => {
			setScrollThrottleHandleCount(scrollThrottleHandleCount + 1);
			throttleInProgress.current = false;
		}, 1000);
	};

	const handleDebounceScroll = () => {
		// If the timer ID is set, reset the timer
		if (timerDebounceRef.current) {
			clearTimeout(timerDebounceRef.current);
		}
		timerDebounceRef.current = setTimeout(() => {
			setScrollDebounceHandleCount(scrollDebounceHandleCount + 1);
		}, 1000);
	};

	const handleScroll = () => {
		handleUsualScroll();
		handleThrottleScroll();
		handleDebounceScroll();
	};

	// useEffect(() => console.log(scrollHandleCount), [scrollHandleCount]);

	return (
		<>
			<h1>Throttle & Debounce</h1>
			<div>Usual scroll handle count: {scrollHandleCount}</div>
			<div>Throttle scroll handle count: {scrollThrottleHandleCount}</div>
			<div>Debound scroll handle count: {scrollDebounceHandleCount}</div>
			<div className="l-scroll" onScroll={handleScroll}>
				<div className="scroll-content">
					<TallContent />
				</div>
			</div>
		</>
	);
}

export default App;
