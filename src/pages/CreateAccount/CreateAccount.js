import { useState, useEffect } from 'react/cjs/react.development';
import './CreateAccount.css'
import Select from 'react-select';

const CreateAccount = ({setCustomer, setToken}) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [password, setPassword] = useState();
    const [libraryAddress, setLibraryAddress] = useState();
    let libraryOptions = [];

    useEffect( async () => {
        const response = await fetch(`https://localhost:44300/api/library`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(library => {
                    libraryOptions.push({value: library.address, label: library.name + " " + library.address})
                });
            }
        }
    })

    const handleChange = (selectedOption) => {
        setLibraryAddress(selectedOption.value);
      }

    const onSubmit = async e => {
        e.preventDefault();
        const response = await fetch(`https://localhost:44300/api/customer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                card_id: 0,
                first_name: firstName,
                last_name: lastName,
                address: address,
                password: password,
                date_of_birth: dateOfBirth
            })

        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                const response2 = await fetch(`https://localhost:44300/api/library_card`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_no: jsonResponse.value.card_id,
                        issuer_address: libraryAddress,
                        date_of_expiration: "2023-10-10T00:00:00"
                    })
        
                });
                if (response2.ok) {
                    const jsonResponse2 = await response2.json();
                    if (jsonResponse2.state === true) {
                        setCustomer({
                            cardId: jsonResponse.value.card_id,
                            firstName: jsonResponse.value.first_name,
                            lastName: jsonResponse.value.last_name,
                            address: jsonResponse.value.address,
                            password: jsonResponse.value.password,
                            dateOfBirth: jsonResponse.value.date_of_birth
                        })
                        setToken(`C${jsonResponse.value.card_id}`);
                        alert("Account has been created");
                        return;
                    } else {
                        alert(jsonResponse2.message);
                    }
                }

            }
        }
        alert("There was a problem creating your account");
    }

    return (
        <div className='create-account'>
            <h1>Create A new Account</h1>
            <form>
                <div className='account-form'> 
                    <label className='create-account-label'>
                        <p>First Name</p>
                        <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)}></input>
                    </label>
                    <label className='create-account-label'>
                        <p>Last Name</p>
                        <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)}></input>
                    </label>
                    <label className='create-account-label'>
                        <p> Date of Birth </p>
                        <input type="date" onChange={e => setDateOfBirth(e.target.value)}></input>
                    </label>
                    <label className='create-account-label'>
                        <p>Address </p>
                        <input type="text" placeholder="Address" onChange={e => setAddress(e.target.value)}></input>
                    </label>
                    <label className='create-account-label'>
                        <p>Password </p>
                        <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                    </label>
                    <label className='create-account-label'>
                        <p>Closest Library</p>
                        <Select className='select' options={libraryOptions}  onChange={handleChange}/>
                    </label>
                    
                    <button className='create-submit' type="submit" onClick={onSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount;