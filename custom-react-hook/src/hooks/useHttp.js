import { useState, useCallback } from "react";

const useHttp = (requestConfig, applyData) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = async () => {
		const { url, method, headers, body } = requestConfig;
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(url, {
				method: method ? method : "GET",
				headers: headers ? headers : {},
				body: body ? JSON.stringify(body) : null,
			});

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const data = await response.json();

			applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	};

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;
