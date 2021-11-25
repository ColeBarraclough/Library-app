import './AddMedia.css'

const AddMedia = (props) => {
    return (
        <div>
            <h1> Select  type of media ex Book, DVD EBook </h1>
            <select name="Type of media" >
                <option value="book">Book</option>
            </select>

            <form>
                <p> A form will be created based on choice</p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddMedia;