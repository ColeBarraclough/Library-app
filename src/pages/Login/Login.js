import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';


const Login = ({setToken, setCustomer, setCreate}) => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async e => {
        e.preventDefault();
        const customer = await fetch(`https://localhost:44300/api/customer?card_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (customer.ok) {
            
            const jsonCustomer = await customer.json();
            if (jsonCustomer.state == true) {
                
                if (jsonCustomer.value.password == password) {
                    alert("Logged in as customer");
                }
                setCustomer({
                    cardId: id,
                    firstName: jsonCustomer.value.first_name,
                    lastName: jsonCustomer.value.last_name,
                    address: jsonCustomer.value.address,
                    password: jsonCustomer.value.password,
                    dateOfBirth: jsonCustomer.value.date_of_birth
                })
                
                setToken(`C${id}`)
                return;
            }
        }


        const librarian = await fetch(`https://localhost:44300/api/librarian?employee_id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (librarian.ok) {
            const jsonLibrarian = await librarian.json();
            console.log(jsonLibrarian)
            if (jsonLibrarian.state == true) {
                
                if (jsonLibrarian.value.password == password) {
                    alert("Logged in as librarian");
                }
                setToken(`L${id}`)
                return;
            }
        }
        alert("Id or password is incorrect")
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Card ID / Employee ID</p>
                    <input type="text" onChange={e => setId(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <BrowserRouter>
                        <Link to="/create-account">
                            <h5 onClick={() => setCreate(true)}>Create a new account</h5>
                        </Link>
                    </BrowserRouter>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;