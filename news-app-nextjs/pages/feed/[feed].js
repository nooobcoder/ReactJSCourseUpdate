import Toolbar from "../../components/toolbar";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../../styles/Feed.module.css";
const Feed = ({ pageNumber, articles }) => {
	const router = useRouter();
	return articles.length ? (
		<>
			<Head>
				<meta property="og:image" content={articles[0]?.urlToImage} />
				<meta
					property="og:description"
					content={articles[0]?.description}
				/>
				<meta
					property="og:title"
					content={articles[0]?.title + " and more!"}
				/>
			</Head>
			<div className="page-container">
				<Toolbar />

				<div className={styles.main}>
					{articles.map((article, index) => (
						<div key={index} className={styles.post}>
							<Link href={article.url} passHref>
								<a target="_blank">
									<h1>{article.title}</h1>
								</a>
							</Link>
							<p>{article.description}</p>
							{!!article.urlToImage && (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={article.urlToImage}
									alt={article.description}
								/>
							)}
						</div>
					))}
				</div>

				<div className={styles.paginator}>
					<div
						className={
							pageNumber === 1 ? styles.disabled : styles.active
						}
						onClick={() => {
							if (pageNumber > 1) {
								// As of the current version of Next.js the default behavior for router.push
								// will leave the scroll where it is, so we have to manually call scrollTo.
								// This however is being worked on and is fixed in canary.
								// Show this in tutorial vid:
								// https://github.com/vercel/next.js/issues/3249
								router
									.push(`/feed/${pageNumber - 1}`)
									.then(() => window.scrollTo(0, 0));
							}
						}}
					>
						Previous Page
					</div>

					<div>#{pageNumber}</div>

					<div
						className={
							pageNumber === 5 ? styles.disabled : styles.active
						}
						onClick={() => {
							if (pageNumber < 5) {
								// As of the current version of Next.js the default behavior for router.push
								// will leave the scroll where it is, so we have to manually call scrollTo.
								// This however is being worked on and is fixed in canary.
								// Show this in tutorial vid:
								// https://github.com/vercel/next.js/issues/3249
								router
									.push(`/feed/${pageNumber + 1}`)
									.then(() => window.scrollTo(0, 0));
							}
						}}
					>
						Next Page
					</div>
				</div>
			</div>
		</>
	) : (
		<div className="page-container">
			<Toolbar />
			<div className={styles.main}>
				<h1>Oops! No articles for this page</h1>
			</div>
		</div>
	);
};

const getServerSideProps = async (context) => {
	const pageNumber = context.query.feed;
	if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
		return { props: { articles: [], pageNumber: 1 } };
	} else {
		// Call the API
		const options = {
			headers: {
				Authorization: `Bearer ${process.env.NEWS_ORG_API_KEY}`,
			},
		};

		const { articles } = await (
			await fetch(
				`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
				{ ...options }
			)
		).json();
		return { props: { articles, pageNumber: +pageNumber } };
	}
};

export default Feed;
export { getServerSideProps };
