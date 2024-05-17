import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    const {deleteNote} = context;


    const { note } = props;
    return (
        <>
            <div className="col-md-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h3>{note.title}</h3>
                            <p className="card-text">{note.description}</p>
                            <i className="fa-solid fa-trash" style={{cursor:'pointer'}} onClick={()=>{deleteNote(note._id)}} ></i>
                            <i className="fa-solid fa-pen-to-square mx-4" style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NoteItem
