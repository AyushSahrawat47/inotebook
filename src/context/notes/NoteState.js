import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6644910130d1092fb5953f9d",
            "user": "6640d8d69ab431eb43239229",
            "title": "My title",
            "description": "Just running a test case",
            "tag": "personal",
            "date": "2024-05-15T10:40:01.470Z",
            "__v": 0
        },
        {
            "_id": "6645f25e425dc8f94e7a4f2a",
            "user": "6640d8d69ab431eb43239229",
            "title": "My title1",
            "description": "Just1 running a test case",
            "tag": "personal",
            "date": "2024-05-16T11:47:42.036Z",
            "__v": 0
        },
        {
            "_id": "6645f269425dc8f94e7a4f2c",
            "user": "6640d8d69ab431eb43239229",
            "title": "My title2",
            "description": "Just2 running a test case",
            "tag": "personal",
            "date": "2024-05-16T11:47:53.704Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);

    //Add a note
    const addNote=(title, description, tag)=>{
        const note =  {
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
    const deleteNote=(id)=>{
        // console.log("Note deleted"+id)
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
    }
    //Edit note
    const editNote=()=>{}



    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;