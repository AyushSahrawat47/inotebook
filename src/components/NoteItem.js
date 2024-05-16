const NoteItem = (props) => {
    const { note } = props;
    return (
        <>
            <div className="col-md-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h3>{note.title}</h3>
                            <p className="card-text">{note.description}</p>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NoteItem
