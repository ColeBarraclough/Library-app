import { wait } from '@testing-library/react';
import { useState, useEffect } from 'react';
import './ReservationClient.css'

const ReservationClient = ({customer}) => {

    const [activeReservations_g, setActiveReservations_g] = useState(null);
    const [checkedOut, setCheckedOut] = useState(null);


    const getCheckOut = async () => {
        if (checkedOut != null) {
            return;
        }
        let bookList = [];
        let dvdList = [];
        let cdList = [];

        let response = await fetch(`https://localhost:44300/api/book`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.borrower_id == customer.cardId) {
                    bookList.push({
                        date_of_check_out: element.date_of_check_out,
                        due_date: element.due_date,
                        key: element.system_id,
                        title: element.title,
                        type: "book",
                        id: element.system_id,
                        library_address: element.library_address,
                        gerne: element.genre,
                        publishing_date: element.publishing_date,
                        author_id: element.author_id,
                        pages: element.pages


                    })
                }
                });

            }
            
        }
        console.log(response)


        response = await fetch(`https://localhost:44300/api/cd`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.borrower_id == customer.cardId) {
                    cdList.push({
                        date_of_check_out: element.date_of_check_out,
                        due_date: element.due_date,
                        key: element.system_id,
                        title: element.title,
                        type: "cd",
                        id: element.system_id,
                        library_address: element.library_address,
                        gerne: element.genre,
                        publishing_date: element.publishing_date,
                        author_id: element.author_id,
                        pages: element.pages
                    })
                }
                });

            }
        }

        response = await fetch(`https://localhost:44300/api/dvd`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    if (element.borrower_id == customer.cardId) {
                        dvdList.push({
                            date_of_check_out: element.date_of_check_out,
                            due_date: element.due_date,
                            key: element.system_id,
                            title: element.title,
                            type: "dvd",
                            id: element.system_id,
                            library_address: element.library_address,
                            gerne: element.genre,
                            publishing_date: element.publishing_date,
                            author_id: element.author_id,
                            pages: element.pages
                        })
                    }
                });

            }
        }

        const list = bookList.concat(cdList).concat(dvdList);

        setCheckedOut(list);





    }
    
    useEffect(async () => {
        if (activeReservations_g != null) {
            getCheckOut();
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
                    setActiveReservations_g([]);
                    return;
                }
                
                setActiveReservations_g(activeReservations);

            }
            
        }
        

    })


    return (
        <div>            <
            
            h3>Check outs </h3>
        <div className='active-reservations'> 
        {checkedOut != null ? checkedOut.map(element => <div className='reservation-lib'>
                                                                                    <p className='reservations-title'>{element.title}</p>
                                                                                    <div className='reservations-dates'>
                                                                                        <p>Pickup Date: {element.date_of_check_out.substring(0, 10)}</p>
                                                                                        <p>Return Date: {element.due_date.substring(0, 10)}</p>
                                                                                    </div >
                                                                            
                                                                                    </div>   
                                                                                    ) : <p>There are no check outs</p>}
                                                            </div>
            <h3> Active reservations </h3>
            <div className='active-reservations'>
                {activeReservations_g != null ? activeReservations_g.length == 0 ? <p>You have no reservations</p> : activeReservations_g.map(element => <div className='reservation'>
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