import { useState, useEffect } from "react";
import Player from "./components/Player/Player";

function App() {
	const [songs] = useState([
		{
			title: "Foo",
			artist: "Bar",
			img_src: "./images/song.jpg",
			src: "./music/on-n-on.mp3",
		},
		{
			title: "Song 2",
			artist: "Artist 2",
			img_src: "./images/song.jpg",
			src: "./music/somebody-new.mp3",
		},
		{
			title: "Song 3",
			artist: "Artist 3",
			img_src: "./images/song.jpg",
			src: "./music/on-n-on.mp3",
		},
		{
			title: "Song 4",
			artist: "Artist 4",
			img_src: "./images/song.jpg",
			src: "./music/somebody-new.mp3",
		},
	]);

	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [nextSongIndex, setNextSongIndex] = useState(0);

	useEffect(() => {
		setNextSongIndex(() => {
			if (currentSongIndex + 1 > songs.length - 1) {
				return 0;
			} else {
				return currentSongIndex + 1;
			}
		});
	}, [currentSongIndex, songs.length]);

	return (
		<div className="App">
			<Player
				currentSongIndex={currentSongIndex}
				setCurrentSongIndex={setCurrentSongIndex}
				nextSongIndex={nextSongIndex}
				songs={songs}
			/>
		</div>
	);
}

export default App;
