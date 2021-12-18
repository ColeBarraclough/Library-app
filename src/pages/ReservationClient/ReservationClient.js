import { wait } from '@testing-library/react';
import { useState, useEffect } from 'react';
import './ReservationClient.css'

const ReservationClient = ({customer}) => {

    const [activeReservations_g, setActiveReservations_g] = useState(null);
    
    useEffect(async () => {
        if (activeReservations_g != null) {
            console.log(activeReservations_g)
            return;
        }
        let activeReservations = [];
        const response = await fetch(`https://localhost:44300/api/reservation`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                
                for (const reservation of jsonResponse.value) {
                    
                    if (customer.cardId == reservation.customer_card_id) {
                        
                        let response = await fetch(`https://localhost:44300/api/book?system_id=${reservation.media_id}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            
                            const jsonResponse = await response.json();
                            if (jsonResponse.state === true) {
                                activeReservations.push({title: jsonResponse.value.title, type: "book", returnDate: reservation.return_date, pickupDate:reservation.pickup_date})
                                continue;
                            }
                        }

                        response = await fetch(`https://localhost:44300/api/cd?system_id=${reservation.media_id}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.ok) {
                            const jsonResponse = await response.json();
                            if (jsonResponse.state === true) {
                                activeReservations.push({title: jsonResponse.value.title, type: "cd", returnDate: reservation.return_date, pickupDate:reservation.pickup_date})
                                continue;
                            }
                        }

                        response = await fetch(`https://localhost:44300/api/dvd?system_id=${reservation.media_id}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.ok) {
                            const jsonResponse = await response.json();
                            if (jsonResponse.state === true) {
                                activeReservations.push({title: jsonResponse.value.title, type: "dvd", returnDate: reservation.return_date, pickupDate:reservation.pickup_date})
                                continue;
                            }
                        }
                        
                    }
                    
                }
                console.log("array:",activeReservations)
                console.log("array length:",activeReservations.length)
                if (activeReservations.length == 0) {
                    return;
                }
                
                setActiveReservations_g(activeReservations);

            }
            
        }
        

    })


    return (
        <div>
            <h3> Active reservations </h3>
            <div className='active-reservations'>
                {activeReservations_g != null ? activeReservations_g.map(element => <div className='reservation'>
                                                                                        <p className='reservations-title'>{element.title}</p>
                                                                                        <div className='reservations-dates'>
                                                                                            <p>Pickup Date: {element.pickupDate.substring(0, 10)}</p>
                                                                                            <p>Return Date: {element.returnDate.substring(0, 10)}</p>
                                                                                        </div>
                                                                                    </div>    
                                                                                        ) : <p>You have no reservations</p>}
            </div>
        </div>
    )
}

export default ReservationClient;