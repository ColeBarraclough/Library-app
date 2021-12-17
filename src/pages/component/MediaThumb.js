import './MediaThumb.css'
import { Link } from 'react-router-dom'

const MediaThumb = ({title, type, id}) => {
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
    return (
            <div className='MediaThumb'>
                <Link to={`/media?${id}`}>
                    <div className='MediaThumbContent'>
                        <img src={imageUrl} alt='Image not avialable' className="Thumbnail-img"></img>
                        <h3 className="Thumbnail-title">{title}</h3>                   
                    </div>
                </Link>
            </div>
    );
}

export default MediaThumb;