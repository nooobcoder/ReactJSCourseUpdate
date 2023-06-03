import { redirect } from "@remix-run/node";

import { logout } from "~/utils/auth.server";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";

const action: ActionFunction = async ({ request }) => logout(request);
const loader: LoaderFunction = async () => redirect("/login");

export { loader, action };
