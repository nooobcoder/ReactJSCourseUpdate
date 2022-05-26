import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

import type { Joke } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";

type ActionData = {
	fields?: { name: string; content: string };
	formError?: string;
	fieldErrors?: {
		name: string | undefined;
		content: string | undefined;
	};
};

const validateJokeContent = (content: string) => {
	if (content.length < 10) {
		return `That joke is too short`;
	}
};

const validateJokeName = (name: string) => {
	if (name.length < 3) {
		return `That joke's name is too short`;
	}
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const name = form.get("name");
	const content = form.get("content");

	// we do this type check to be extra sure and to make TypeScript happy
	// we'll explore validation next!
	if (typeof name !== "string" || typeof content !== "string") {
		return badRequest({ formError: `Form not submitted correctly!` });
	}

	const fieldErrors = {
		name: validateJokeName(name),
		content: validateJokeContent(content),
	};

	const fields = { name, content };

	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({ fieldErrors, fields });
	}

	const joke: Joke = await db.joke.create({
		data: fields,
	});

	return redirect(`/jokes/${joke.id}`);
};

function NewJoke() {
	const actionData = useActionData<ActionData>();

	return (
		/* Form with name and content fields */
		<div>
			<p>Add your own hilarious joke</p>
			<form method="post">
				<div>
					<label>
						Name:{" "}
						<input
							type="text"
							defaultValue={actionData?.fields?.name}
							name="name"
							aria-invalid={
								Boolean(actionData?.fieldErrors?.name) ||
								undefined
							}
							aria-errormessage={
								actionData?.fieldErrors?.name
									? "name-error"
									: undefined
							}
						/>
					</label>
					{actionData?.fieldErrors?.name ? (
						<p
							className="form-validation-error"
							role="alert"
							id="name-error"
						>
							{actionData.fieldErrors.name}
						</p>
					) : null}
				</div>
				<div>
					<label>
						Content:{" "}
						<textarea
							defaultValue={actionData?.fields?.content}
							name="content"
							aria-invalid={
								Boolean(actionData?.fieldErrors?.content) ||
								undefined
							}
							aria-errormessage={
								actionData?.fieldErrors?.content
									? "content-error"
									: undefined
							}
						/>
					</label>
					{actionData?.fieldErrors?.content ? (
						<p
							className="form-validation-error"
							role="alert"
							id="content-error"
						>
							{actionData.fieldErrors.content}
						</p>
					) : null}
				</div>
				<div>
					{actionData?.formError ? (
						<p className="form-validation-error" role="alert">
							{actionData.formError}
						</p>
					) : null}
					<button type="submit" className="button">
						Add
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewJoke;
export { action };
