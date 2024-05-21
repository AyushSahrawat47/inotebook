import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ4ZDY5YWI0MzFlYjQzMjM5MjI5In0sImlhdCI6MTcxNTYxMjA0Mn0.RIhOsbstC9dFaWLfyk2pc7ZBRBwHRtEyavW5Dm73jmI",
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //Api call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ4ZDY5YWI0MzFlYjQzMjM5MjI5In0sImlhdCI6MTcxNTYxMjA0Mn0.RIhOsbstC9dFaWLfyk2pc7ZBRBwHRtEyavW5Dm73jmI",
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = {
            "_id": "6644910130d1092fb5953f9da",
            "user": "6640d8d69ab431eb43239229",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-05-15T10:40:01.470Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = async(id) => {
        // id.preventDeafault();
        //Api call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ4ZDY5YWI0MzFlYjQzMjM5MjI5In0sImlhdCI6MTcxNTYxMjA0Mn0.RIhOsbstC9dFaWLfyk2pc7ZBRBwHRtEyavW5Dm73jmI",
            },
        });
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    //Edit note
    const editNote = async (id, title, description, tag) => {
        //API Call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ4ZDY5YWI0MzFlYjQzMjM5MjI5In0sImlhdCI6MTcxNTYxMjA0Mn0.RIhOsbstC9dFaWLfyk2pc7ZBRBwHRtEyavW5Dm73jmI",
            },
            body: JSON.stringify({ title, description, tag }),
        });
        
        //It will make a deep copy of it 
        let newNotes = JSON.parse(JSON.stringify(notes))
        
        //Logic for the client side
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;