// TODO: Detect user language
const locale = "en-US";

// TODO: Detect user currency/Allow currency selection (usd | eur)
const regionCurrency = "eur";

// Types for function parameter
type Variant = {
	prices: [
		{
			amount: number;
			currency_code: string;
		}
	];
};

export function formatPrice(variant: Variant) {
	const price = variant.prices.find(
		(price) => price.currency_code == regionCurrency
	);
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: regionCurrency,
	}).format(price?.amount ?? 0 / 100);
}
