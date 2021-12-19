import "./Author.css"
import { useState, useEffect } from "react"
import MediaList from '../component/MediaList';

const AuthorLibrarian = () => {


    const [author, setAuthor] = useState();
    const [media, setMedia] = useState();
    const [editing, setEditing] = useState(false);

    const getMedia = async (address) => {


        let bookList = [];
        let dvdList = [];
        let cdList = [];
        let ebookList = [];
        let audiobookList = [];

        let response = await fetch(`https://localhost:44300/api/book`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.author_id == address) {
                        bookList.push({
                            key: element.system_id,
                            title: element.title,
                            type: "book",
                            id: element.system_id
                        })
                    } 
                });

            }
            
        }


        response = await fetch(`https://localhost:44300/api/cd`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.author_id == address) {
                        cdList.push({
                            key: element.system_id,
                            title: element.title,
                            type: "cd",
                            id: element.system_id
                        })
                    }
                });

            }
        }

        response = await fetch(`https://localhost:44300/api/dvd`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.author_id == address) {
                        dvdList.push({
                            key: element.system_id,
                            title: element.title,
                            type: "dvd",
                            id: element.system_id
                        })
                    }
                });

            }
        }

        response = await fetch(`https://localhost:44300/api/audiobook`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.author_id == address) {
                        dvdList.push({
                            key: element.system_id,
                            title: element.title,
                            type: "audiobook",
                            id: element.system_id
                        })
                    }
                });

            }
        }

        response = await fetch(`https://localhost:44300/api/ebook`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.author_id == address) {
                        dvdList.push({
                            key: element.system_id,
                            title: element.title,
                            type: "ebook",
                            id: element.system_id
                        })
                    }
                });

            }
        }

        return bookList.concat(cdList).concat(dvdList).concat(ebookList).concat(audiobookList);
        
        }


    useEffect(async () => {
        if (author != null) {
            if (media == null) {
                const mediaList = await getMedia(author.author_id);
                console.log(mediaList);
                setMedia(mediaList);
            }
            return;
        }
        let id = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
        id = id.replaceAll("%20", " ")
        console.log(id);
        let response = await fetch(`https://localhost:44300/api/author?author_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                console.log(jsonResponse.value);
                setAuthor(
                    jsonResponse.value
                )
                return;
            }
            
        }
    })


    const handleEdit =  async e => {
        e.preventDefault();
        if (!editing) {

            setEditing(true);
            return;
        }
        const response = await fetch(`https://localhost:44300/api/author`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(author)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state == true) {
                alert("Edit success")
                setEditing(false);
                return
            }
        }
        alert("There was a problem")
        setEditing(false);
    }

    if (author == null) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <div className='library-info'>
                <label>
                    <p>First Name</p>
                    <input type='text' disabled={!editing} value={author.first_name} onChange={e => {setAuthor({author_id: author.author_id, first_name: e.target.value, last_name: author.last_name, date_of_birth: author.date_of_birth})}}></input>
                </label>
                <label>
                    <p>Last Name</p>
                    <input type='text' disabled={!editing} value={author.last_name} onChange={e => {setAuthor({author_id: author.author_id, first_name:author.first_name, last_name: e.target.value, date_of_birth: author.date_of_birth})}}></input>
                </label>
                <label>
                    <p>Date Of Birth</p>
                    <input type='date' disabled={!editing} value={author.date_of_birth.substring(0, 10)} onChange={e => {setAuthor({author_id: author.author_id, first_name:author.first_name, last_name: author.last_name, date_of_birth: e.target.value})}}></input>
                </label>
                <button onClick={handleEdit}>{editing ? "Submit": "Edit"}</button>
            </div>
            <h3> Media List</h3>
            <div className='active-reservations'>
                {media == null ? null : 
                <MediaList mediaList={media} />}
            </div>
        </div>
    )
}


export default AuthorLibrarian;