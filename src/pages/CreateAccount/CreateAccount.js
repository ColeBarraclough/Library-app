import { useState } from 'react/cjs/react.development';
import './CreateAccount.css'

const CreateAccount = ({setCustomer, setToken}) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [password, setPassword] = useState();

    const onSubmit = async e => {
        e.preventDefault();
        console.log(dateOfBirth);
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
            }
        }
        alert("There was a problem creating your account");
    }

    return (
        <div>
            <h1>Create A new Account</h1>
            <form>
                <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)}></input>
                <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)}></input>
                <h6> Date of Birth </h6>
                <input type="date" onChange={e => setDateOfBirth(e.target.value)}></input>
                <input type="text" placeholder="Address" onChange={e => setAddress(e.target.value)}></input>
                <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CreateAccount;