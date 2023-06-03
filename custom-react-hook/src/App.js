import React, { useEffect, useState } from "react";

import useHttp from "./hooks/useHttp";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

const App = () => {
	const [tasks, setTasks] = useState([]);

	const transformTasks = (tasksObj) => {
		const loadedTasks = [];

		for (const taskKey in tasksObj) {
			loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
		}

		setTasks(loadedTasks);
	};

	const {
		isLoading,
		error,
		sendRequest: fetchTasks,
	} = useHttp(
		{
			url: `${process.env.REACT_APP_API_ENDPOINT}/tasks.json`,
			method: "GET",
		},
		transformTasks
	);

	useEffect(() => {
		fetchTasks();
	}, []);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
};

export default App;
