import { Fragment } from "react";
import FooterContainer from "./containers/FooterContainer";
import JumbotronContainer from "./containers/JumbotronContainer";

const App = () => {
	return (
		<Fragment>
			<JumbotronContainer />
			<FooterContainer />
		</Fragment>
	);
};

export default App;
