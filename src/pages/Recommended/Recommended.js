import './Recommended.css';
import MediaList from '../component/MediaList';
import MediaThumb from '../component/MediaThumb';
import data from './../data'
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';


const Recommended = ({customer, librarian}) => {


    const [lists, setLists] = useState();


    useEffect(async () => {
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
                    bookList.push({
                        key: element.system_id,
                        title: element.title,
                        type: "book",
                        id: element.system_id
                    })
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
                    cdList.push({
                        key: element.system_id,
                        title: element.title,
                        type: "cd",
                        id: element.system_id
                    })
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
                    dvdList.push({
                        key: element.system_id,
                        title: element.title,
                        type: "dvd",
                        id: element.system_id
                    })
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
                    ebookList.push({
                        key: element.system_id,
                        title: element.title,
                        type: "ebook",
                        id: element.system_id
                    })
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
                    audiobookList.push({
                        key: element.system_id,
                        title: element.title,
                        type: "audiobook",
                        id: element.system_id
                    })
                });

            }
        }

        let recommendedList_l = [];
        const list = bookList.concat(cdList).concat(dvdList).concat(ebookList).concat(audiobookList)

        if (customer != null) {
            
            response = await fetch(`https://localhost:44300/api/recommendation`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                
                if (jsonResponse.state === true) {
                    jsonResponse.value.forEach(element => {
                        if (element.recommendation_card === customer.cardId) {
                            
                            const media = list.find(found => found.id == element.media_id);
                            
                            recommendedList_l.push({
                                key: element.media_id,
                                title: media.title,
                                type: media.type,
                                id: element.media_id
                            })
                        }
                    });
                }
            }
        } 



        setLists({recommendedList: recommendedList_l, mediaList: list})

    })

    const p = {
        title: "To Kill A MockingBird",
        thumbnail: "logo192.png",
        link: ""
    };

    return(
        <div className='Recommend'>
            {librarian == null ? 
            <div id="BookListContianter" className="ListContianer">
                <h2 className="ListContianerTitle">Recommended</h2>
                {lists == null ? null : <MediaList mediaList={lists.recommendedList}></MediaList>}
            </div> : null}
            <div id="CDListContianter" className="ListContianer">
                <h2 className="ListContianerTitle">All media</h2>
                {lists == null ? null : <MediaList mediaList={lists.mediaList}></MediaList>}
            </div>
        </div>
    );
}

export default Recommended;