import './Reservation.css'

const  Reservation = ({title, name, date}) => {
    return (
        <div className='ReservationContent'>
            <h4 className="Thumbnail-title">Name {name}</h4> 
            <h3 className="Thumbnail-title">Title {title}</h3>
            <h4 className="Thumbnail-title">Date {date}</h4>                    
        </div>
    )
}

export default Reservation;