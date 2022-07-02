import React from "react";
import Task from "./Task";

export default {
	title: "Task",
	component: Task,
};

const Template = (args) => <Task {...args} />;

const Default = Template.bind({});
Default.args = {
	task: {
		id: `1`,
		title: `Test Task`,
		state: `TASK_INBOX`,
	},
};

const Pinned = Template.bind({});
Pinned.args = {
	task: {
		...Default.args.task,
		state: `TASK_PINNED`,
	},
};

const Archived = Template.bind({});
Archived.args = {
	task: {
		...Default.args.task,
		state: `TASK_ARCHIVED`,
	},
};

export { Default, Pinned, Archived };
