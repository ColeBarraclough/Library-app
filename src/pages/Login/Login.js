import './Login.css'
import { useState } from 'react'
import { Link} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';


const Login = ({setToken, setCustomer, setCreate, setLibrarian}) => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState("customer");

    


    const handleSubmit = async e => {
        e.preventDefault();
        if (userType === "customer") {
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
            }
            alert("Id or password is incorrect")
        } else {


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

                        const admin = await fetch(`https://localhost:44300/api/library?address=${jsonLibrarian.value.library_address}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        if (admin.ok) {
                            const jsonAdmin = await admin.json();
                            console.log(jsonAdmin);
                            if (jsonAdmin.state === true) {
                                
                                if (jsonAdmin.value.admin_id === jsonLibrarian.value.employee_id) {
                                    alert("Logged in as admin");
                                    setToken(`A${id}`)
                                } else {
                                    setToken(`L${id}`)
                                }
                            } else {
                                alert("Logged in as librarian");
                                setToken(`L${id}`)
                            }
                        } else {
                            alert("Logged in as librarian");
                            setToken(`L${id}`)
                        }
                        setLibrarian(jsonLibrarian.value)
                        return;

                        
                    }
                }
            }
            alert("Id or password is incorrect")
        }
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
                <div className='create-account-tag'>
                    <BrowserRouter>
                        <Link to="/create-account">
                            <h5 onClick={() => setCreate(true)} >Create a new account</h5>
                        </Link>
                    </BrowserRouter>
                </div>
                <p>Login as</p>
                <Select className='select' onChange={selectedOption => setUserType(selectedOption.value)} options={[ {value:"customer", label:"Customer"},
                                    {value:"librarian", label:"Librarian"}]} />
                <div className='submit-login'>
                    <button className='submit-login' type="submit">Submit</button>
                </div>
                
            </form>
        </div>
    );
}

export default Login;