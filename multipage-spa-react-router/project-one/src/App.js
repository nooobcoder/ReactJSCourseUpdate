import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/quotes" />
				</Route>
				<Route path="/quotes" exact>
					<AllQuotes />
				</Route>
				<Route path="/quotes/:quoteId">
					<QuoteDetail />
				</Route>
				<Route path="/new-quote" exact>
					<NewQuote />
				</Route>
			</Switch>
		</Layout>
	);
};

export default App;
