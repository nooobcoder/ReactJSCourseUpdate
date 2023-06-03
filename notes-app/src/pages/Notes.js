import React, { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
//import notes from '../assets/data'
import ListItem from "../components/ListItem";

const Notes = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () =>
    setNotes(
      await (
        await fetch(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/notes/`
        )
      ).json()
    );

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>

      <AddButton />
    </div>
  );
};

export default Notes;
