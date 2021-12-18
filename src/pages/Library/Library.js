import './Library.css'
import  {useEffect, useState} from 'react'
import MediaList from '../component/MediaList';

const Library = () => {

    const [library_db, setLibrary] = useState();
    const [media, setMedia] = useState();

    
    useEffect(async () => {
        if (library_db != null) {
            if (media == null) {
                const mediaList = await getMedia(library_db.address);
                console.log(mediaList);
                setMedia(mediaList);
            }
            return;
        }
        let address = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
        address = address.replaceAll("%20", " ")
        console.log(address);
        let response = await fetch(`https://localhost:44300/api/library?address=${address}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                console.log(jsonResponse.value);
                setLibrary(
                    jsonResponse.value
                )
                console.log("library",library_db);
                return;
            }
            
        }
    })


        


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
                    if (element.library_address == address) {
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
                    if (element.library_address == address) {
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
                    if (element.library_address == address) {
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

        return bookList.concat(cdList).concat(dvdList).concat(ebookList).concat(audiobookList);
        
        }

    if (library_db == null) {
        return (
            <div>
            </div>
        )
    }
    return (
        <div>
            <div className='library-info'>
                <h1>{library_db.name}</h1>
                <h2>{library_db.address}</h2>
                <a href={library_db.website_address}>{library_db.website_address}</a>
            </div>
            <h3> Media List</h3>
            <div className='active-reservations'>
                {media == null ? null : 
                <MediaList mediaList={media} />}
            </div>
        </div>
    )
}

export default Library;