import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const Note = ({ match, history }) => {
  let noteId = match.params.id;

  let [note, setNote] = useState(null);

  //let note = notes.find(note => note.id == noteId)

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new") return;
    let response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/notes/${noteId}`
    );
    let data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/notes/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...note, updated: new Date() })
      }
    );
  };

  const updateNote = async () => {
    await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/notes/${noteId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...note, updated: new Date() })
      }
    );
  };

  const deleteNote = async () => {
    await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/notes/${noteId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      }
    );
    history.push("/");
  };

  let handleSubmit = () => {
    if (noteId !== "new" && !note.body) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    }

    history.push("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={"/"}>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={e => {
          setNote({ ...note, body: e.target.value });
        }}
        placeholder="Edit note"
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default Note;
