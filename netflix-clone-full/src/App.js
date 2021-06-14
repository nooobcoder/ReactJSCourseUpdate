import { Fragment } from "react";
import FaqsContainer from "./containers/faqs";
import FooterContainer from "./containers/FooterContainer";
import JumbotronContainer from "./containers/JumbotronContainer";
import AnimatedCursor from "react-animated-cursor";
import { OptForm } from "./components";

const App = () => {
	return (
		<Fragment>
			<AnimatedCursor
				innerSize={8}
				outerSize={9}
				color="229, 9, 20"
				outerAlpha={0.1}
				innerScale={0.7}
				outerScale={4}
			/>
			<JumbotronContainer />
			<FaqsContainer />
			<OptForm />
			<FooterContainer />
		</Fragment>
	);
};

export default App;
