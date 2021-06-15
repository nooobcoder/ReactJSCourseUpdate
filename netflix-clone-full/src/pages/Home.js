import { Fragment } from "react";
import FaqsContainer from "../containers/faqs";
import FooterContainer from "../containers/FooterContainer";
import JumbotronContainer from "../containers/JumbotronContainer";
import { OptForm } from "../components";

const Home = () => {
	return (
		<Fragment>
			<JumbotronContainer />
			<FaqsContainer />
			<OptForm />
			<FooterContainer />
		</Fragment>
	);
};

export default Home;
