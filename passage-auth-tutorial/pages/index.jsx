import * as React from "react";

export default function Home({ appId }) {
	/* Importing @passageidentity/passage-elements/passage-auth triggers a side-effect that will register the passage-auth custom element with the client browser for usage. Since Next.js pre-renders pages on the server this presents a common issue with using web components, such as the Passage elements, in pre-rendered pages - when the server side pre-render occurs there is no client window defined to call window.customElements.define() on, which results in an error being thrown.

  The most common solution when using custom elements in pre-rendered applications is to defer the registration of the custom element to a lifecycle hook so that the code is only executed when the client app is executed in browser.
  */
	React.useEffect(() => {
		require("@passageidentity/passage-elements/passage-auth");
	}, []);

	return (
		<>
			<passage-auth app-id={appId} />
		</>
	);
}

export const getStaticProps = async () => ({
	props: {
		appId: process.env.PASSAGE_APP_ID,
	},
});
