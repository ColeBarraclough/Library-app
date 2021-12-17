import './ReservationLibrarian.css'
import Reservation from '../component/Reservation'

const ReservationLibrarian = () => {
    return (
        <div className="reservations">
            <h3>Active Reservations </h3>
            <div className='active-reservations'> 
                <p>Info about reservation</p>
                <p>Info about reservation</p>
                <p>Info about reservation</p>
                <p>Info about reservation</p>
                <p>Info about reservation</p>
            </div>
            <h3>Pending Reservations </h3>
            <div className='pending-reservations'>
                <form>
                    <div>
                        <Reservation title={"TKM"} type={"cd"} id={1}/>
                        <button className='accept-button'>Accept</button>
                        <button className='deny-button'>Deny</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReservationLibrarian;