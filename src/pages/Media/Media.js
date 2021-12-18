import './Media.css'
import { useEffect, useState} from 'react';


const Media = ({customer}) => {

    const [media, setMedia] = useState();
    let lists = null;

    const recommendMedia = async () => {
        if (lists != null) {
            return;
        }

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
                    bookList.push(element)
                });

            }
            
        }
        console.log(response)


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
                    cdList.push(element)
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
                    dvdList.push(element);
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
                    ebookList.push(element)
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
                    audiobookList.push(element)
                });

            }
        }


        lists = bookList.concat(cdList).concat(dvdList).concat(ebookList).concat(audiobookList)

        console.log(lists);
        console.log(media)
        for (const media_item of lists) {
            if (media_item.author_id == media.author_id) {
                addRecommended(media_item);
            } else if (media_item.library_address == media.library_address) {
                if (getRandomInt(0, 100) < 20) 
                    addRecommended(media_item);
            }
        }

        
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }



    const addRecommended = async (item) => {
        if (item.system_id == media.system_id) {
            return;
        }
        let exists = false;
        const response = await fetch(`https://localhost:44300/api/recommendation`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state == true) {
                
                for (const media_item of jsonResponse.value) {
                    if (media_item.media_id == item.system_id) {
                        exists = true;
                    }
                }
            }
        }

        if (!exists) {
            const response = await fetch(`https://localhost:44300/api/recommendation`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recommendation_address : item.library_address == null ? "10 University Drive NW" : item.library_address,
                    media_id : item.system_id,
                    recommendation_card : customer.cardId

                })
            });
        }
    }

    const deleteRecommended = async () => {
        const response = await fetch(`https://localhost:44300/api/recommendation`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recommendation_address : media.library_address == null ? "10 University Drive NW": media.library_address,
                media_id : media.system_id,
                recommendation_card : customer.cardId
            })
        });
    }
    
    useEffect(async () => {
        if (media != null) {
            recommendMedia();
            deleteRecommended();
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
                setMedia(
                    jsonResponse.value
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
        const response = await fetch(`https://localhost:44300/api/reservation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                librarian_id: 1,
                return_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                pickup_date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                media_id: media.system_id,
                customer_card_id: customer.cardId
            })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                alert("Reservation complete");
                return;
            }
            
        }
    }

    if (media == null) {
        return (<div>

        </div>);
    } else 
    return (
        <div className='media'>
            <h1>{media.title}</h1>
            {media.library_address != null ? <h4>Library Address: {media.library_address}</h4>: null}

            <h4>Genre: {media.genre}</h4>
            <h4>Publishing Date: {media.publishing_date.substring(0, media.publishing_date.lastIndexOf("T"))}</h4>
            <h4>Author: {media.author_name}</h4>
            {media.link != null ?<a href={media.link}>Link: {media.link}</a> : null}
            {media.pages != null ? <h4>Pages: {media.pages}</h4>: null}
            {media.run_time != null ? <h4>Run Time: {media.run_time}</h4>: null}
            {media.length != null ? <h4>Length: {media.length}</h4>: null}
            {media.library_address != null ?
            media.borrower_id != null ? <div className='reserve-button-div'><button className='reserve-button' disabled={true}> Reserve</button> <h4> Can't reserve. Media is checked out</h4></div>: <button className='reserve-button' onClick={handleClick}> Reserve</button>: null}
            
        </div>
    )
}

export default Media;