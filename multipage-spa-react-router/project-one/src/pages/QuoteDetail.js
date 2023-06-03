import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

/* const DUMMY_QUOTES = [
	{ id: "q1", author: "Ankur Paul", text: "Learning React is so fun!" },
	{
		id: "q2",
		author: "Aishi Paul",
		text: "3DS Max is a very heavy design software!",
	},
]; */

const QuoteDetail = ({ quotes }) => {
	const params = useParams();
	const quote = quotes.find((quote) => quote.id === params.quoteId);

	return quote ? (
		<Fragment>
			<HighlightedQuote text={quote?.text} author={quote?.author} />
			<Route path={`/quotes/:quoteId/comments`}>
				<Comments />
			</Route>
		</Fragment>
	) : (
		<HighlightedQuote
			text={"No such quote found!"}
			author={"Administrator"}
		/>
	);
};

export default QuoteDetail;
