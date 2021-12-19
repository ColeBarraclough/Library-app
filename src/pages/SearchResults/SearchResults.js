import './SearchResults.css'
import { useEffect, useState } from 'react'
import SearchResult from './SearchResult';


const SearchResults = ({searchTerms}) => {

    const searchResults = [];

    const [searchElements, setSearchElements] = useState([]);


    useEffect(async () => {
        
        if (searchElements.length > 0) {
            return;
        }
        if (searchTerms == null) {
            return;
        }
                    
        let response = await fetch(`https://localhost:44300/api/book`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(book => {
                   if (searchTermsMatch(book)) {
                       searchResults.push({title: book.title, type: "book", genre: book.genre, id: book.system_id})
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
                jsonResponse.value.forEach(cd => {
                    if (searchTermsMatch(cd)) {
                        searchResults.push({title: cd.title, type: "cd", genre: cd.genre, id: cd.system_id})
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
                jsonResponse.value.forEach(dvd => {
                    if (searchTermsMatch(dvd)) {
                        searchResults.push({title: dvd.title, type: "dvd", genre: dvd.genre, id: dvd.system_id})
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
                jsonResponse.value.forEach(ebook => {
                    if (searchTermsMatch(ebook)) {
                        searchResults.push({title: ebook.title, type: "ebook", genre: ebook.genre, id: ebook.system_id})
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
                jsonResponse.value.forEach(audiobook => {
                    if (searchTermsMatch(audiobook)) {
                        searchResults.push({title: audiobook.title, type: "audiobook", genre: audiobook.genre, id: audiobook.system_id})
                    } 
                 });
            }
        }



        response = await fetch(`https://localhost:44300/api/library`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(library => {
                    if (checkAllWords(library.address) || checkAllWords(library.name) || checkAllWords(library.website_url)) {
                        searchResults.push({address: library.address, type: "library", name: library.name, website_url: library.website_url})
                    } 
                 });
            }
        }


        response = await fetch(`https://localhost:44300/api/author`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(author => {
                    if (checkAllWords(author.first_name) || checkAllWords(author.last_name)) {
                        searchResults.push({author_id: author.author_id, type: "author", full_name: author.first_name + " " + author.last_name})
                    } 
                 });
            }
        }





        setSearchElements(searchResults);
        
    })


    const searchTermsMatch = (item) => {
        if (checkAllWords(item.title) || checkAllWords(item.library_address) || checkAllWords(item.genre)) {
            return true;
        } 
        return false;

    }

    const checkAllWords = (sentence) => {
        if (sentence == null) {
            return
        }
        
        const words = sentence.toLowerCase().split(" ");
        
        for (const word of words) {
            if (searchTerms.toLowerCase().includes(word)) {
                return true;
            }
        }
        return false;
    }




    console.log(searchTerms)
    return (
        <div>
            <h1>Results</h1>
            <div className='active-reservations'>
                {searchElements.length == 0 ? <p>No results</p>:searchElements.map(element =>  <SearchResult title={element.title} type={element.type} genre={element.genre}
                                                 id={element.id} address={element.address} name={element.name} website_url={element.website_url} author_id={element.author_id} author_name={element.full_name}
                                                 />)}
            </div>
        </div>
    )
}

export default SearchResults;