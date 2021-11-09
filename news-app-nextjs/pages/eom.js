import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/EOM.module.css";
import Toolbar from "../components/toolbar";

const eom = ({ employee }) => {
	return (
		<>
			<Head>
				<title>Employee Of The Month</title>
				<meta
					name="description"
					content={`This month's employee of the month is ${employee.name}`}
				/>

				<meta property="og:image" content={employee.image} />
				<meta property="og:title" content="Employee Of The Month" />
				<meta
					property="og:description"
					content={`This month's employee of the month is ${employee.name}`}
				/>

				<meta property="twitter:image" content={employee.image} />
				<meta
					property="twitter:title"
					content="Employee Of The Month"
				/>
				<meta
					property="twitter:description"
					content={`This month's employee of the month is ${employee.name}`}
				/>
			</Head>
			<div className="page-container">
				<Toolbar />
				<div className={styles.main}>
					<h1>Employee of the Month</h1>
					<div className={styles.employeeOfTheMonth}>
						<h3>{employee.name}</h3>
						<h6>{employee.position}</h6>
						<Image
							src={employee.image}
							alt={employee.name}
							height="100px"
							width="100px"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const getServerSideProps = async (context) => {
	const response = await (
		await fetch(
			"https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth",
			{ method: "GET" }
		)
	).json();
	return { props: { employee: response } };
};

export default eom;
export { getServerSideProps };
