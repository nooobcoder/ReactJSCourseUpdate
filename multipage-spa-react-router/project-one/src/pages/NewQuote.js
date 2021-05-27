import { useHistory } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
	const history = useHistory();

	const addQuoteHandler = async (quoteData) => {
		if (!quoteData) return;
		const response = await fetch(
			`${process.env.REACT_APP_FIREBASE_ENDPOINT}/quotes.json`,
			{
				method: "POST",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(quoteData),
			}
		);
		if (response.ok) console.log(await response.json());
		history.push("/quotes");
	};
	return <QuoteForm onAddQuote={(props) => addQuoteHandler(props)} />;
};

export default NewQuote;
