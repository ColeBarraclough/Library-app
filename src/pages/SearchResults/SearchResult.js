import { Link } from 'react-router-dom'
import './SearchResult.css'


const SearchResult = ({title, type, id, genre, address, name, website_url}) => {
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

    if (type === "library") {
        return (
            <div>
                <Link to={`/library?${address}`}>
                    <h2>{name}</h2>
                    <h4>{address}</h4>
                    <image src={imageUrl} width={"50px"} height={"50px"} className="Thumbnail-img"></image>
                </Link>
            </div>
        )
    }
    
    return (
        <div>
            <Link to={`/media?${id}`}>
                <h2>{title}</h2>
                <h4>{genre}</h4>
                <image src={imageUrl} width={"50px"} height={"50px"} className="Thumbnail-img"></image>
            </Link>
        </div>
    )
}

export default SearchResult;