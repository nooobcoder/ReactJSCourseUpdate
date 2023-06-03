import QuoteList from "../components/quotes/QuoteList";

/* const DUMMY_QUOTES = [
	{ id: "q1", author: "Ankur Paul", text: "Learning React is so fun!" },
	{
		id: "q2",
		author: "Aishi Paul",
		text: "3DS Max is a very heavy design software!",
	},
]; */

const AllQuotes = ({ quotes }) => {
	return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
