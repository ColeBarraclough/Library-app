import './ReservationLibrarian.css'
import Reservation from '../component/Reservation'
import { useState, useEffect } from 'react';

const ReservationLibrarian = ({librarian}) => {

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
                    if (element.borrower_id != null) {
                    bookList.push({
                        media_id: element.system_id,
                        borrower_id: element.borrower_id,
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
                    if (element.borrower_id != null) {
                    cdList.push({
                        media_id: element.system_id,
                        borrower_id: element.borrower_id,
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
                    if (element.borrower_id != null) {
                        dvdList.push({
                            media_id: element.system_id,
                            borrower_id: element.borrower_id,
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
                    
                    if (librarian.employee_id == reservation.librarian_id) {
                        
                        let response = await fetch(`https://localhost:44300/api/book?system_id=${reservation.media_id}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            
                            const jsonResponse = await response.json();
                            if (jsonResponse.state === true) {
                                activeReservations.push({title: jsonResponse.value.title, type: "book", returnDate: reservation.return_date, pickupDate:reservation.pickup_date, customer_card_id: reservation.customer_card_id, media_id: reservation.media_id})
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
                                activeReservations.push({title: jsonResponse.value.title, type: "cd", returnDate: reservation.return_date, pickupDate:reservation.pickup_date, customer_card_id: reservation.customer_card_id, media_id: reservation.media_id})
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
                                activeReservations.push({title: jsonResponse.value.title, type: "dvd", returnDate: reservation.return_date, pickupDate:reservation.pickup_date, customer_card_id: reservation.customer_card_id, media_id: reservation.media_id})
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

    const acceptReservation = async (e, element) => {
        e.preventDefault();
        let item;
        let response = await fetch(`https://localhost:44300/api/${element.type}?system_id=${element.media_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            if (jsonResponse.state == true) {
                item = jsonResponse.value;
            }
        }
        console.log(item)

        item.borrower_id = element.customer_card_id;
        item.date_of_check_out = element.pickupDate;
        item.due_date = element.returnDate;

        
        console.log(element);
        response = await fetch(`https://localhost:44300/api/${element.type}?system_id=${element.media_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            item )
        });


        response = await fetch(`https://localhost:44300/api/reservation`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                librarian_id: librarian.employee_id,
                media_id: element.media_id,
                customer_card_id: element.customer_card_id
            })
        });
        setActiveReservations_g(null)
        console.log(response)
    }


    const denyReservation = async (e, element) => {
        e.preventDefault();
        console.log(element)
        const response = await fetch(`https://localhost:44300/api/reservation`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                librarian_id: librarian.employee_id,
                media_id: element.media_id,
                customer_card_id: element.customer_card_id
            })
        });
        setActiveReservations_g(null)
    }

    const handleReturn = async (e, element) => {
        e.preventDefault();
        console.log(element)
        let item;
        let response = await fetch(`https://localhost:44300/api/${element.type}?system_id=${element.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            if (jsonResponse.state == true) {
                item = jsonResponse.value;
            }
        }
        console.log(item)

        item.borrower_id = null;
        item.date_of_check_out = null;
        item.due_date = null;

        
        console.log(element);
        response = await fetch(`https://localhost:44300/api/${element.type}?system_id=${element.media_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            item )
        });
        setCheckedOut(null)
        
    }


    if (librarian == null) {
        return(
            <div>

            </div>
        )
    }
    return (
        <div className="reservations">
            <h3>Check outs </h3>
            <div className='active-reservations'> 
            {checkedOut != null ? checkedOut.map(element => <div className='reservation-lib'>
                                                                                        <p className='reservations-title'>{element.title}</p>
                                                                                        <div className='reservations-dates'>
                                                                                            <p>Pickup Date: {element.date_of_check_out.substring(0, 10)}</p>
                                                                                            <p>Return Date: {element.due_date.substring(0, 10)}</p>
                                                                                            <button className='returned' onClick={e => (handleReturn(e, element))}>Returned</button>
                                                                                        </div >
                                                                                        </div>   
                                                                                        ) : <p>There are no check outs</p>}
            </div>
            <h3>Pending Reservations </h3>
            <div className='pending-reservations'>
                <form>
                {activeReservations_g != null? activeReservations_g.length == 0 ? <p>You have no reservations</p>: activeReservations_g.map(element => <div className='reservation-lib'>
                                                                                        <p className='reservations-title'>{element.title}</p>
                                                                                        <div className='reservations-dates'>
                                                                                            <p>Pickup Date: {element.pickupDate.substring(0, 10)}</p>
                                                                                            <p>Return Date: {element.returnDate.substring(0, 10)}</p>
                                                                                            <div className='reservations-buttons'>
                                                                                            <button className='accept-button' onClick={(e) => {acceptReservation(e, element)}}>Accept</button>
                                                                                            <button className='deny-button' onClick={(e) => {denyReservation(e, element)}}>Deny</button>
                                                                                            </div>
                                                                                        </div> 
                                                                                        </div>   
                                                                                        ) : <p>You have no reservations</p>}
                </form>
            </div>
        </div>
    )
}

export default ReservationLibrarian;