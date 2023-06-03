import BookList from "./components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
	uri: `http://192.168.0.120:3000/graphql`,
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<h2>Ankur's Reading List</h2>
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
