import { Link } from 'react-router-dom'
import './SearchResult.css'


const SearchResult = ({title, type, id, genre, address, name, website_url, author_id, author_name}) => {
    let imageUrl;

    switch (type) {
        case 'book':
            imageUrl = 'book.png'
            break;
        case 'cd':
            imageUrl = 'cd.png'
            break;
        case 'ebook':
            imageUrl = 'ebook.png'
            break;
        case 'audiobook':
            imageUrl = 'audiobook.png'
            break;
        default:
            imageUrl = "logo192.png"
            break;
    }

    if (type === "author") {
        return (
            <div className='result'>
                <Link to={`/author?${author_id}`}>
                    <h2>{author_name}</h2>
                    <image src={imageUrl} width={"50px"} height={"50px"} className="Thumbnail-img"></image>
                </Link>
            </div>
        )
    }

    if (type === "library") {
        return (
            <div className='result'>
                <Link to={`/library?${address}`}>
                    <h2>{name}</h2>
                    <h4>{address}</h4>
                    <image src={imageUrl} width={"50px"} height={"50px"} className="Thumbnail-img"></image>
                </Link>
            </div>
        )
    }
    
    return (
        <div className='result'>
            <Link to={`/media?${id}`}>
                <h2>{title}</h2>
                <h4>{genre}</h4>
                <image src={imageUrl} width={"50px"} height={"50px"} className="Thumbnail-img"></image>
            </Link>
        </div>
    )
}

export default SearchResult;