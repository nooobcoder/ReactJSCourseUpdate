import React, { useCallback, useEffect, useState, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));

const App = () => {
	const [quotes, setQuotes] = useState([]);

	const fetchAllQuotes = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_FIREBASE_ENDPOINT}/quotes.json`,
				{ method: "GET" }
			);
			if (!response.ok) throw new Error("Failed to fetch quotes");
			return await response.json();
		} catch (error) {
			console.error(error.message);
		}
	};

	const task = useCallback(async () => {
		const data = await fetchAllQuotes();
		const tempArr = [];
		for (const keys in data) {
			tempArr.push({ ...data[keys], id: keys });
			console.log(tempArr);
		}
		setQuotes(tempArr);
	}, []);

	useEffect(() => {
		if (quotes.length === 0) task();
	}, [quotes, task]);

	return (
		<Layout>
			<Suspense
				fallback={
					<div className="centered">
						<LoadingSpinner />
					</div>
				}
			>
				<Switch>
					<Route path="/" exact>
						<Redirect to="/quotes" />
					</Route>
					<Route path="/quotes" exact>
						<AllQuotes quotes={quotes} />
					</Route>
					<Route path="/quotes/:quoteId">
						<QuoteDetail quotes={quotes} />
					</Route>
					<Route path="/new-quote" exact>
						<NewQuote />
					</Route>
					<Route path="*" component={NotFound} />
				</Switch>
			</Suspense>
		</Layout>
	);
};

export default App;
