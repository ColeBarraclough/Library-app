import './AccountInfo.css'
import { useState } from 'react'

const librarian_d = {
    employee_id: "-1",
    first_name: "",
    last_name: "",
    phone_no: "",
    address: "",
    social_insurance_no: "",
    library_address: "",
    password: "",
  }

const AccountInfoLibrarian = ({librarian, setLibrarian}) => {

    const [editable, setEditable] = useState(true);
    const [buttonText, setButtonText] = useState("Edit");

    const [firstName, setFirstName] = useState(librarian.first_name);
    const [lastName, setLastName] = useState(librarian.last_name);
    const [phoneNo, setPhoneNo] = useState(librarian.phone_no);
    const [address, setAddress] = useState(librarian.address);
    const [socialInsuranceNo, setSocialInsuranceNo] = useState(librarian.social_insurance_no);



    const onEdit = async e => {
        e.preventDefault();
        if (buttonText === "Edit") {
            setButtonText("Submit");
            setEditable(false);
        } else { 
            setButtonText("Edit");
            setEditable(true);

            const response = await fetch(`https://localhost:44300/api/librarian`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employee_id: librarian.employee_id,
                    first_name: firstName,
                    last_name: lastName,
                    phone_no: phoneNo,
                    address: address,
                    social_insurance_no: socialInsuranceNo,
                    library_address: librarian.library_address,
                    password: librarian.password
                })
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.state == true) {
                    console.log(librarian);
                    setLibrarian({
                        employee_id: librarian.employee_id,
                        first_name: firstName,
                        last_name: lastName,
                        phone_no: phoneNo,
                        address: address,
                        social_insurance_no: socialInsuranceNo,
                        library_address: librarian.library_address,
                        password: librarian.password
                    })
                    console.log(librarian);
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
                <h2 className='account-label'>Employee Id</h2>
                <h2 >{librarian.employee_id}</h2>
            </div>
            <div className='account-first-name'>   
                <h2 className='account-label'>First name </h2>
                <input  className='account-input' type="text" disabled={editable} onChange={e => setFirstName(e.target.value)} value={firstName}></input>
            </div>
            <div className='account-last-name'>   
                <h2 className='account-label'>Last name </h2>
                <input className='account-input' type="text" disabled={editable} onChange={e => setLastName(e.target.value)} value={lastName}></input>
            </div>
            <div className='account-date-of-birth'>   
                <h2 className='account-label'>Phone Number </h2>
                <input  className='account-input' type="text" disabled={editable} onChange={e => setPhoneNo(e.target.value)} value={phoneNo}></input>
            </div>
            <div className='account-address'>
                <h2 className='account-label'>Address </h2>
                <input className='account-input' type="text" disabled={editable} onChange={e => setAddress(e.target.value)} value={address}></input>
            </div>
            <div className='account-address'>
                <h2 className='account-label'>Social Insurance Number </h2>
                <input className='account-input' type="text" disabled={editable} onChange={e => setSocialInsuranceNo(e.target.value)} value={socialInsuranceNo}></input>
            </div>
            <div className='account-edit-div'>
                <button className='account-edit' onClick={onEdit}>{buttonText}</button>
            </div>
            
        </div>
    )
}

export default AccountInfoLibrarian;