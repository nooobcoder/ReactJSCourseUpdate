import {
	getDownloadURL,
	ref,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

import "./App.css";
import { storage } from "./firebase";

export default function App() {
	const [progressPercent, setProgressPercent] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const file = e.target[0]?.files[0];
		console.log(`Handle Submit`, e.target[0].files);
		if (!file) return null;

		const storageRef = ref(storage, `files/${file.name}`);
		// const snapshot = await uploadBytes(storageRef, file);

		// console.log(snapshot);
		// if (snapshot) {
		// 	e.target[0].value = null;
		// 	const url = await getDownloadURL(storageRef);
		// 	console.log(url);
		// }

		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgressPercent(progress);
			},
			(error) => {
				switch (error.code) {
					case `storage/cancelled`:
						alert(`Upload cancelled`);
						break;
					default:
						alert(error);
				}
			},
			() => {
				e.target[0].value = "";
				getDownloadURL(storageRef).then((downloadURL) => {
					console.log(downloadURL);
				});
			}
		);
	};

	return (
		<div className="App">
			<div className="app" name="upload_file">
				<form className="app__form" onSubmit={handleSubmit}>
					<input type="file" />
					<progress
						className="app__progress"
						value={progressPercent}
						max="100"
					/>
					<button type="submit" className="button">
						Upload
					</button>
				</form>
			</div>
		</div>
	);
}
