import { redirect } from "@remix-run/node";
import { logout } from "~/utils/session.server";

import type { LoaderFunction, ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
	return logout(request);
};

export const loader: LoaderFunction = async () => {
	return redirect("/");
};
