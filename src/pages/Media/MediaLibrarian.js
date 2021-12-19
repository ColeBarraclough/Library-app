import './Media.css'
import { useEffect, useState} from 'react';
import Select from 'react-select';


const MediaLibrarian = ({librarian}) => {

    const [media, setMedia] = useState();

    const [editing, setEditing] = useState();


    const [options, setOptions] = useState();

    
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

    useEffect(async () => {
        if (media != null) {
            async function fetchData() {
                if (options == null) {
                    let authorOptions = await getAuthors();
                    let libraryOptions = await getLibraries();
                    setOptions({libraryOptions, authorOptions});
                }
            }
            fetchData();
            return;
        }
        let id = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
        console.log(id);
        let response = await fetch(`https://localhost:44300/api/book?system_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                const author_name = await getAuthor(jsonResponse.value.author_id)
                jsonResponse.value.author_name = author_name;
                jsonResponse.value.type = "book";
                setMedia(
                    jsonResponse.value,
                )
                return;
            }
            
        }


        response = await fetch(`https://localhost:44300/api/cd?system_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                const author_name = await getAuthor(jsonResponse.value.author_id)
                jsonResponse.value.author_name = author_name;
                jsonResponse.value.type = "cd";
                setMedia(
                    jsonResponse.value
                )
                return;
            }
        }

        response = await fetch(`https://localhost:44300/api/dvd?system_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                const author_name = await getAuthor(jsonResponse.value.author_id)
                jsonResponse.value.author_name = author_name;
                jsonResponse.value.type = "dvd";
                setMedia(
                    jsonResponse.value
                )
                console.log(media);
                return;
            }
        }


        response = await fetch(`https://localhost:44300/api/audiobook?system_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                const author_name = await getAuthor(jsonResponse.value.author_id)
                jsonResponse.value.author_name = author_name;
                jsonResponse.value.type = "audiobook";
                setMedia(
                    jsonResponse.value
                )
                console.log(media);
                return;
            }
        }

        response = await fetch(`https://localhost:44300/api/ebook?system_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                const author_name = await getAuthor(jsonResponse.value.author_id)
                jsonResponse.value.author_name = author_name;
                jsonResponse.value.type = "ebook";
                setMedia(
                    jsonResponse.value
                )
                console.log(media);
                return;
            }

            
            
        }
        alert("There was a problem retrieving media");

    })


    const getAuthor = async id => {
        let author_name;
        let response = await fetch(`https://localhost:44300/api/author?author_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                
                author_name = jsonResponse.value.full_name;
            }
            
        }
        
        return author_name;
    }


    const handleClick = async e => {
        e.preventDefault();
        if (editing) {
            let type;
            if (media.pages != null && media.link != null) {
                type = "ebook"
            } else if (media.pages != null && media.library_address != null) {
                type = "book"
            } else if (media.run_time != null && media.library_address != null) {
                type = "dvd"
            } else if (media.run_time != null && media.link != null) {
                type = "audiobook"
            } else if (media.length != null && media.library_address != null) {
                type = "cd"
            }
            let response = await fetch(`https://localhost:44300/api/${type}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(media)
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.state === true) {
                    alert("Media edited complete");
                }
                
            }

            response = await fetch(`https://localhost:44300/api/update`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    librarian_id: librarian.employee_id,
                    media_id: media.system_id,
                    library_address: librarian.library_address
                })
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.state === true) {
                    alert("Media edited complete");
                }
                
            }
            console.log(response);

            setEditing(false);
        } else {
            setEditing(true);
        }
    }



    if (librarian == null) {
        return(
            <div>
                
            </div>
        )
    }

    if (media == null) {
        return (<div>

        </div>);
    }
    return (
        <div className='media'>
            <div className='edit-cont'>
                <h1>Title:</h1>
                <input type="text" disabled={!editing} value={media.title} onChange={e => setMedia({system_id: media.system_id, title: e.target.value, library_address: media.library_address, genre: media.genre, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: media.length, run_time: media.run_time})}></input>
            </div>

            {media.library_address != null ? 
                <div className='edit-cont'>
                <h4>Library Address: </h4>
                {editing ? <Select className='select' options={options.libraryOptions} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: e.value, genre: media.genre, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: media.length, run_time: media.run_time})}/> : <h4>{media.library_address}</h4>}
                </div>
            : null}

            <div className='edit-cont'>
                <h4>Genre: </h4>
                <input type="text" disabled={!editing} value={media.genre} onChange={e =>setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: e.target.value, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: media.length, run_time: media.run_time})}></input>
            </div>
            
            <div className='edit-cont'>
                <h4>Publishing Date: </h4>
                <input type="date" disabled={!editing} value={media.publishing_date.substring(0, 10)} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: media.genre, publishing_date: e.target.value, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: media.length, run_time: media.run_time})}></input>
            </div>
            
            <div className='edit-cont'>
                <h4>Author: </h4>
                {editing ? <Select className='select' options={options.authorOptions} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: media.genre, publishing_date: media.publishing_date, author_id: e.value, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: media.length, run_time: media.run_time})}/> : <h4>{media.author_name}</h4>}
            </div>
            
            {media.link != null ?
                !editing ? <a href={media.link}>Link: {media.link}</a>:
                <div className='edit-cont'>
                    <h4>Link: </h4>
                    <input type="text" value={media.link} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: media.genre, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: e.target.value, pages: media.pages, length: media.length, run_time: media.run_time})} ></input>
                </div>
                : null}

            {media.pages != null ? 
                        <div className='edit-cont'>
                            <h4>Pages: </h4>
                            <input type="text" disabled={!editing} value={media.pages} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: media.genre, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: e.target.value, length: media.length, run_time: media.run_time})}></input>
                        </div>
                : null}
            {media.run_time != null ?
                        <div className='edit-cont'>
                            <h4>Run Time: </h4>
                            <input type="text" disabled={!editing} value={media.run_time} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: media.genre, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: media.length, run_time: e.target.value})}></input>
                        </div>
                        : null}
            {media.length != null ? 
                        <div className='edit-cont'> 
                            <h4>Lenght: </h4>
                            <input type="text" disabled={!editing} value={media.length} onChange={e => setMedia({system_id: media.system_id, title: media.title, library_address: media.library_address, genre: media.genre, publishing_date: media.publishing_date, author_id: media.author_id, borrower_id: media.borrower_id, due_date: media.due_date, date_of_check_out: media.date_of_check_out, link: media.link, pages: media.pages, length: e.target.value, run_time: media.run_time})}></input>
                        </div>: null}
            <div className='reserve-button-div'> 
                <button className='reserve-button' onClick={handleClick}>{editing ? "Submit" : "Edit"}</button> 
            </div>
            
        </div>
    )
}

export default MediaLibrarian;