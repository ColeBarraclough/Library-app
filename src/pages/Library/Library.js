import './Library.css'

const Library = (props) => {
    return (
        <div>
            <h1>Library Title</h1>
            <h6>Additional Info</h6>
            <p>Address, Media and other things go here</p>
            <h3> Media List (probably look more like Recommend in the future)</h3>
            <div className='active-reservations'>
                <p>Media Info</p>
                <p>Media Info</p>
                <p>Media Info</p>
                <p>Media Info</p>
                <p>Media Info</p>
            </div>
        </div>
    )
}

export default Library;