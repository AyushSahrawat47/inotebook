import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes} = context;

    return (
        <>
            <div className="container my-3">
                <AddNote />
            </div>
            <div className="row my-5">
                <h1>Your Notes</h1>
                {/* here we have used the map object to iterate through every element in notes array and display them via NOteITEM component    */}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
