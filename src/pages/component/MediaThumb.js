import './MediaThumb.css'
import { Link } from 'react-router-dom'

const MediaThumb = ({title, thumbnail, link}) => {
    return (
            <div className='MediaThumb'>
                <Link to={link}>
                    <div className='MediaThumbContent'>
                        <img src={thumbnail} alt='Image not avialable' className="Thumbnail-img"></img>
                        <h3 className="Thumbnail-title">{title}</h3>                   
                    </div>
                </Link>
            </div>
    );
}

export default MediaThumb;