import './AddMedia.css'
import { useState } from 'react';
import Select from 'react-select';

const AddMedia = (props) => {

    const [selected, setSelected] = useState();

    const authorOptions = [
        {value: 1, label: "JRR Tolkien"},
        {value: 2, label: "George R Martin"},
        {value: 3, label: "Mary Shelby"},
        {value: 4, label: "Me"},
    ]

    const libraryOptions = [
        {value: "420 over there st", label: "Calgary public library"},
        {value: "1233 greenwall dr", label: "other lib"},
    ]


    return (
        <div>
            <h1> Select type of media</h1>
            <select name="Type of media" onChange={e => setSelected(e.target.value)}>
                <option value="book">Book</option>
                <option value="cd">CD</option>
                <option value="dvd">DVD</option>
                <option value="e-Book">E-Book</option>
                <option value="audiobook">Audiobook</option>
            </select>

            <form>
                <label>
                    <p>Title</p>
                    <input type="text"></input>
                </label>
                <label>
                    <p>Genre</p>
                    <input type="text"></input>
                </label>
                <label>
                    <p>Publishing Date</p>
                    <input type="date"></input>
                </label>
                <label>
                    <p>Author</p>
                    <Select options={authorOptions} />
                </label>

                {selected === 'book' ? (
                    <div>
                        <label>
                            <p>Library</p>
                            <Select options={libraryOptions} />
                        </label>
                        <label>
                            <p>Pages</p>
                            <input type="text"></input>
                        </label>
                    </div>
                ) : selected === 'cd' ? (
                    <div>
                        <label>
                            <p>Library</p>
                            <Select options={libraryOptions} />
                        </label>
                        <label>
                            <p>Length</p>
                            <input type="text"></input>
                        </label>
                    </div>
                ) : selected === 'dvd' ? (
                    <div>
                        <label>
                            <p>Library</p>
                            <Select options={libraryOptions} />
                        </label>
                        <label>
                            <p>Run time</p>
                            <input type="text"></input>
                        </label>
                    </div>
                ) : selected === 'e-Book' ? (
                    <label>
                        <p>Pages</p>
                        <input type="text"></input>
                    </label>
                ) : selected === 'audiobook' ? (
                    <label>
                        <p>Run time</p>
                        <input type="text"></input>
                    </label>
                ) : null}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddMedia;