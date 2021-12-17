import './AccountInfo.css'
import { useState } from 'react'

const AccountInfo = ({customer, setCustomer}) => {

    const [editable, setEditable] = useState(true);
    const [buttonText, setButtonText] = useState("Edit");

    const [firstName, setFirstName] = useState(customer.firstName);
    const [lastName, setLastName] = useState(customer.lastName);
    const [address, setAddress] = useState(customer.address);
    const [dateOfBirth, setDateOfBirth] = useState(customer.dateOfBirth);

    console.log(dateOfBirth.substring(0, 11));



    const onEdit = async e => {
        e.preventDefault();
        if (buttonText === "Edit") {
            setButtonText("Submit");
            setEditable(false);
        } else { 
            setButtonText("Edit");
            setEditable(true);

            const response = await fetch(`https://localhost:44300/api/customer`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    card_id: customer.cardId,
                    password: customer.password,
                    address: address,
                    first_name: firstName,
                    last_name: lastName,
                    date_of_birth: dateOfBirth
                })
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.state == true) {
                    setCustomer({
                        card_id: customer.cardId,
                        password: customer.password,
                        address: address,
                        first_name: firstName,
                        last_name: lastName,
                        date_of_birth: dateOfBirth
                    })
                    console.log(customer);
                    alert("Account has been edited");
                    return;
                } else {
                    alert("There was a problem editing your account " + jsonResponse.message);
                }
            }
            

        }


        
    }

    return (
        <div className='account'>
            <h1> Your Account </h1>
            <div className='account-card-id'>
                <h2 className='account-label'>Card Id</h2>
                <h2 >{customer.cardId}</h2>
            </div>
            <div className='account-first-name'>   
                <h2 className='account-label'>First name </h2>
                <input  className='account-input' type="text" disabled={editable} onChange={e => setFirstName(e.target.value)} placeholder={firstName}></input>
            </div>
            <div className='account-last-name'>   
                <h2 className='account-label'>Last name </h2>
                <input className='account-input' type="text" disabled={editable} onChange={e => setLastName(e.target.value)} placeholder={lastName}></input>
            </div>
            <div className='account-date-of-birth'>   
                <h4 className='account-label'>Date of birth</h4>
                <input  className='account-input' type="date" disabled={editable} onChange={e => setDateOfBirth(e.target.value)} value={dateOfBirth.substring(0, 10)}></input>
            </div>
            <div className='account-address'>
                <h2 className='account-label'>Address </h2>
                <input className='account-input' type="text" disabled={editable} onChange={e => setAddress(e.target.value)} placeholder={address}></input>
            </div>
            <div className='account-edit-div'>
                <button className='account-edit' onClick={onEdit}>{buttonText}</button>
            </div>
            
        </div>
    )
}

export default AccountInfo;