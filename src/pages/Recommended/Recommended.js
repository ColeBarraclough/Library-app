import './Recommended.css';
import MediaList from './component/MediaList';
import MediaThumb from './component/MediaThumb';
import data from './../data'


const Recommended = () => {
    const p = {
        title: "To Kill A MockingBird",
        thumbnail: "logo192.png",
        link: ""
    };

    return(
        <div className='Recommend'>
            <div id="BookListContianter" className="ListContianer">
                <h2 className="ListContianerTitle">Books</h2>
                <MediaList mediaList={data}></MediaList>
            </div>
            <div id="CDListContianter" className="ListContianer">
                <h2 className="ListContianerTitle">CDs</h2>
                <MediaList mediaList={data}></MediaList>
            </div>
            <div id="DVDListContianter" className="ListContianer">
                <h2 className="ListContianerTitle">DVDs</h2>
                <MediaList mediaList={data}></MediaList>
            </div>
        </div>
    );
}

export default Recommended;