import "./Author.css"
import { useState, useEffect } from "react"
import MediaList from '../component/MediaList';

const Author = () => {


    const [author, setAuthor] = useState();
    const [media, setMedia] = useState();

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
    if (author == null) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <div className='library-info'>
                <h1>{author.first_name} {author.last_name}</h1>
                <h2>{author.date_of_birth}</h2>
            </div>
            <h3> Media List</h3>
            <div className='active-reservations'>
                {media == null ? null : 
                <MediaList mediaList={media} />}
            </div>
        </div>
    )
}


export default Author;