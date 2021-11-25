import './ReservationLibrarian.css'

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
                    <p>Info about reservation</p>
                    <button type="button">Approve</button>
                    <button type="button">Deny</button>
                    <p>Info about reservation</p>
                    <button type="button">Approve</button>
                    <button type="button">Deny</button>
 
                </form>
            </div>
        </div>
    )
}

export default ReservationLibrarian;