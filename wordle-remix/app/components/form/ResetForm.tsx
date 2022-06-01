import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

interface ResetFormProps {
	disabled: boolean;
}

export function ResetForm({ disabled }: ResetFormProps) {
	return (
		<Form method="post">
			<Button
				type="submit"
				variant="secondary"
				name="_action"
				disabled={disabled}
				value="reset"
			>
				Reset
			</Button>
		</Form>
	);
}
