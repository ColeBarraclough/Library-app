import './AddMedia.css'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const AddMedia = ({librarian}) => {

    const [selected, setSelected] = useState("book");


    const [title, setTitle] = useState();
    const [libraryAddress, setLibraryAddress] = useState();
    const [genre, setGenre] = useState();
    const [publishingDate, setPublishingDate] = useState();
    const [authorId, setAuthorId] = useState();
    const [link, setLink] = useState();
    const [misc, setMisc] = useState();
    


    const [options, setOptions] = useState();

    useEffect(() => {
        
        async function fetchData() {
            if (options == null) {
                let authorOptions = await getAuthors();
                let libraryOptions = await getLibraries();
                setOptions({libraryOptions, authorOptions});
            }
        }
        fetchData();

    })

    const getAuthors = async () => {
        const authors = [];
        const response = await fetch(`https://localhost:44300/api/author`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    authors.push({value: element.author_id, label: element.full_name})
                });
            }
        }
        console.log(authors)
        return authors;
    }

    const getLibraries = async () => {
        const libraries = [];
        const response = await fetch(`https://localhost:44300/api/library`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    libraries.push({value: element.address, label: element.name + "     " + element.address})
                });
            }
        }
        console.log(libraries)
        return libraries;
    }

    const handleClick = async e => {
        e.preventDefault();

        console.log(title, libraryAddress, genre, publishingDate, authorId, link, misc)
        const media = {
            title: title,
            genre: genre,
            publishing_date: publishingDate,
            author_id: authorId,
        }
        switch (selected) {
            case "book":
                media.library_address = libraryAddress;
                media.pages = misc;
                break;
            case "cd":
                media.library_address = libraryAddress;
                media.length = misc;
                break;
            case "dvd":
                media.library_address = libraryAddress;
                media.run_time = misc;
                break;
            case "ebook":
                media.link = link;
                media.pages = misc;
                break;
            case "audiobook":
                media.link = link;
                media.run_time = misc;
                break;
            default:
                return;
        }
        console.log(media)

        const response = await fetch(`https://localhost:44300/api/${selected}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(media)

        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                alert("Added media");
                return;
            }
            alert("There was a problem " + jsonResponse.message);
        }
        console.log(response);
        alert("There was a problem ")
        
    }

    if (options == null) {
        return (
            <div>

            </div>
        )
    }

    if (librarian == null) {
        return(
            <div>
                
            </div>
        )
    }
    return (
        <div>
            <div className='boc'>
                <h1> Select type of media</h1>
                <select name="Type of media" defaultValue={"book"} onChange={e => setSelected(e.target.value)}>
                    <option value="book">Book</option>
                    <option value="cd">CD</option>
                    <option value="dvd">DVD</option>
                    <option value="e-Book">E-Book</option>
                    <option value="audiobook">Audiobook</option>
                </select>
                <Link to="/create-author">
                    <button className='create-authors'>Create Authors</button>
                </Link>
            </div>

            <form>
                <label>
                    <p>Title</p>
                    <input type="text" onChange={e => setTitle(e.target.value)}></input>
                </label>
                <label>
                    <p>Genre</p>
                    <input type="text" onChange={e => setGenre(e.target.value)}></input>
                </label>
                <label>
                    <p>Publishing Date</p>
                    <input type="date" onChange={e => setPublishingDate(e.target.value)}></input>
                </label>
                <label>
                    <p>Author</p>
                    <Select className='select' options={options.authorOptions} onChange={e => setAuthorId(e.value)}/>
                </label>

                {selected === 'book' ? (
                    <div>
                        <label>
                            <p>Library</p>
                            <Select className='select' options={options.libraryOptions}  onChange={e => setLibraryAddress(e.value)}/>
                        </label>
                        <label>
                            <p>Pages</p>
                            <input type="text" onChange={e => setMisc(e.target.value)}></input>
                        </label>
                    </div>
                ) : selected === 'cd' ? (
                    <div>
                        <label>
                            <p>Library</p>
                            <Select className='select' options={options.libraryOptions} onChange={e => setLibraryAddress(e.value)}/>
                        </label>
                        <label>
                            <p>Length</p>
                            <input type="text" onChange={e => setMisc(e.target.value)}></input>
                        </label>
                    </div>
                ) : selected === 'dvd' ? (
                    <div>
                        <label>
                            <p>Library</p>
                            <Select className='select' options={options.libraryOptions} onChange={e => setLibraryAddress(e.value)}/>
                        </label>
                        <label>
                            <p>Run time</p>
                            <input type="text" onChange={e => setMisc(e.target.value)}></input>
                        </label>
                    </div>
                ) : selected === 'e-Book' ? (
                    <div>
                        <label>
                            <p>Link</p>
                            <input type="text" onChange={e => setLink(e.target.value)}></input>
                        </label>
                        <label>
                            <p>Pages</p>
                            <input type="text" onChange={e => setMisc(e.target.value)}></input>
                        </label>
                    </div>
                ) : selected === 'audiobook' ? (
                    <div>
                        <label>
                            <p>Link</p>
                            <input type="text" onChange={e => setLink(e.target.value)}></input>
                        </label>
                        <label>
                            <p>Run time</p>
                            <input type="text" onChange={e => setMisc(e.target.value)}></input>
                        </label>
                    </div>
                ) : null}
                <button type='submit' onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddMedia;