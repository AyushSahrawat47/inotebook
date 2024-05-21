import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    // state to set defaults value of title, description and tag to pass when we want to make a new note
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })


    //function applied to submit button to update note state
    const handleClick = (e) => {
        //preventDefault as the name suggests prevents the default reloading of the page
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    //on changing the input tag this onChange function just set the value entered into the name of target
    const onChange = (e) => {
        // incase you forgot these 3 dots in front of note is spread syntax
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className='container my-3'>
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    
                    <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
