import './MediaList.css'
import MediaThumb from './MediaThumb';

const MediaList = (props) => {
    return (
            <div className='MediaList'>
                {props.mediaList.map((data) => {
                    return (
                                <div className="MediaItem">
                                    <MediaThumb key={data.key} {...data}/>
                                </div>
                            )})}
            </div>
    );
}

export default MediaList;