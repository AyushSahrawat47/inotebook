import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote} = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    
    // state to set defaults value of title, description and tag to pass when we want to make a new note
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })


    useEffect(() => {
        getNotes()
        //eslint-disable-next-line
    }, [])

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle : currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    //on changing the input tag this onChange function just set the value entered into the name of target
    const onChange = (e) => {
        // incase you forgot these 3 dots in front of note is spread syntax
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref}  data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* modal*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                    </div>
                </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
export default Notes
