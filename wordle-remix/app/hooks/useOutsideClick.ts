import { useEffect } from "react";

import type { RefObject } from "react";

export function useOutsideClick(
	ref: RefObject<HTMLElement>,
	callback: (event: Event) => void
) {
	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback(event);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside); // Cleanup Function
	}, [callback]);
}
