import React from "react";

// Get current year
const currentYear = new Date().getFullYear();
const brandName = `Remix - Store`;
const Footer = () => (
	<div className="py-4 text-sm text-center text-gray-200 bg-gray-800">
		&copy; Copyright {currentYear} {`[${brandName}]`}. All Rights Reserved
	</div>
);

export default Footer;
