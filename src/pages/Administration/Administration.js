import Select from 'react-select';
import { useState, useEffect } from 'react/cjs/react.development';
import './Administration.css'

const Administration = (props) => {

    const [library, setLibrary] = useState({name: "", address: "", website_url: "", admin_id: ""});
    const [librarian, setLibrarian] = useState({first_name: "", last_name: "", phone_no: "", address: "", social_insurance_no: "", library_address: "", password: ""});
    const [customer, setCustomer] = useState({first_name: "", last_name: "", date_of_birth: "", address: "", password: "", library_address: ""});
    const [options, setOptions] = useState({admins: null, libraries: null});

    useEffect(() => {
        async function fetchData() {
            if (options.admins == null || options.libraries == null) {
                const admins = await getAdmins();
                const libraries = await getLibraries();
                console.log(admins);
                console.log(libraries);
                setOptions({admins, libraries});
            }
        }
        fetchData();
    })

    const getAdmins = async () => {
        const authors = [];
        const response = await fetch(`https://localhost:44300/api/library`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                for (const element of jsonResponse.value) {
                    const response2 = await fetch(`https://localhost:44300/api/librarian`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response2);
                    if (response2.ok) {
                        const jsonResponse2 = await response2.json();
                        if (jsonResponse2.state === true) {
                            for (const librarian of jsonResponse2.value)
                            authors.push({value: librarian.employee_id, label: librarian.employee_id + " " + librarian.full_name})
                        }
                    }
                    
                }
            }
        }
        console.log(authors)
        return authors;
    }

    const getLibraries = async () => {
        const libraries = [];
        const response = await fetch(`https://localhost:44300/api/library`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                jsonResponse.value.forEach(element => {
                    libraries.push({value: element.address, label: element.name + "     " + element.address})
                });
            }
        }
        console.log(libraries)
        return libraries;
    }

    const handleLibrary = async e => {
        e.preventDefault();
        console.log(library);
        const response = await fetch(`https://localhost:44300/api/library`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(library)

        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                alert("Account has been created");
            } else {
                alert(jsonResponse.message);
            }
        }
    }

    const handleLibrararian = async e => {
        e.preventDefault();
        console.log(librarian)
        const response = await fetch(`https://localhost:44300/api/librarian`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(librarian)

        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state === true) {
                alert("Account has been created");
            } else {
                alert(jsonResponse.message);
            }
        }
        console.log(response)
    }

    const handleCustomer = async e => {
        e.preventDefault();
        const response = await fetch(`https://localhost:44300/api/customer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)

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
                        issuer_address: customer.library_address,
                        date_of_expiration: "2023-10-10T00:00:00"
                    })
        
                });
                if (response2.ok) {
                    const jsonResponse2 = await response2.json();
                    if (jsonResponse2.state === true) {
                        alert("Account has been created");
                        return;
                    } else {
                        alert(jsonResponse2.message);
                    }
                }

            }
        }
    }

        if (librarian == null) {
        return(
            <div>
                
            </div>
        )
    }
    return (
        <div className='admin'>
            <h1>Add/Create Libraries </h1>
            <div className='add-library'>
                <form onSubmit={handleLibrary} >
                <div className="add-librarian">
                    <input type="text" placeholder="Address" onChange={e => setLibrary({name: library.name, address: e.target.value, website_url: library.website_url, admin_id: library.admin_id})}></input>
                    <input type="text" placeholder="Name" onChange={e => setLibrary({name: e.target.value, address: library.address, website_url: library.website_url, admin_id: library.admin_id})}></input>
                    <input type="text" placeholder="Website Address" onChange={e => setLibrary({name: library.name, address: library.address, website_url: e.target.value, admin_id: library.admin_id})} ></input>
                    <Select className='select' type="text" options={options.admins} onChange={e => setLibrary({name: library.name, address: library.address, website_url: library.website_url, admin_id: e.value})}></Select>
                    <button className='admin-button' type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <h1>Add/Create Librarains </h1>
            <div className="add-librarian">
                <form onSubmit={handleLibrararian}>
                    <div className="add-librarian">
                    <input type="text" placeholder="First Name" onChange={e => setLibrarian({first_name: e.target.value, last_name: librarian.last_name, phone_no: librarian.phone_no, address: librarian.address, social_insurance_no: librarian.social_insurance_no, library_address: librarian.library_address, password: librarian.password})}></input>
                    <input type="text" placeholder="Last Name" onChange={e => setLibrarian({first_name: librarian.first_name, last_name: e.target.value, phone_no: librarian.phone_no, address: librarian.address, social_insurance_no: librarian.social_insurance_no, library_address: librarian.library_address, password: librarian.password})}></input>
                    <input type="text" placeholder="Phone number" onChange={e => setLibrarian({first_name: librarian.first_name, last_name: librarian.last_name, phone_no: e.target.value, address: librarian.address, social_insurance_no: librarian.social_insurance_no, library_address: librarian.library_address, password: librarian.password})}></input>
                    <input type="text" placeholder="Address" onChange={e => setLibrarian({first_name: librarian.first_name, last_name: librarian.last_name, phone_no: librarian.phone_no, address: e.target.value, social_insurance_no: librarian.social_insurance_no, library_address: librarian.library_address, password: librarian.password})}></input>
                    <input type="text" placeholder="Social insurance number" onChange={e => setLibrarian({first_name: librarian.first_name, last_name: librarian.last_name, phone_no: librarian.phone_no, address: librarian.address, social_insurance_no: e.target.value, library_address: librarian.library_address, password: librarian.password})}></input>
                    <Select className='select' type="text" options={options.libraries} onChange={e => setLibrarian({first_name: librarian.first_name, last_name: librarian.last_name, phone_no: librarian.phone_no, address: librarian.address, social_insurance_no: librarian.social_insurance_no, library_address: e.value, password: librarian.password})}></Select>
                    <input type="text" placeholder="Password" onChange={e => setLibrarian({first_name: librarian.first_name, last_name: librarian.last_name, phone_no: librarian.phone_no, address: librarian.address, social_insurance_no: librarian.social_insurance_no, library_address: librarian.library_address, password: e.target.value})}></input>
                    <button className='admin-button' type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <h1>Add/Create Customer </h1>
            <div className="add-customer">
                <form onSubmit={handleCustomer}>
                <div className="add-librarian">
                    <input type="text" placeholder="First Name" onChange={e => setCustomer({first_name: e.target.value, last_name: customer.last_name, date_of_birth: customer.date_of_birth, address: customer.address, password: customer.password, library_address: customer.library_address})}></input>
                    <input type="text" placeholder="Last Name" onChange={e => setCustomer({first_name: customer.first_name, last_name: e.target.value, date_of_birth: customer.date_of_birth, address: customer.address, password: customer.password, library_address: customer.library_address})}></input>
                    <input type="date" placeholder="Date of Birth" onChange={e => setCustomer({first_name: customer.first_name, last_name: customer.last_name, date_of_birth: e.target.value, address: customer.address, password: customer.password, library_address: customer.library_address})}></input>
                    <input type="text" placeholder="Address" onChange={e => setCustomer({first_name: customer.first_name, last_name: customer.last_name, date_of_birth: customer.date_of_birth, address: e.target.value, password: customer.password, library_address: customer.library_address})}></input>
                    <input type="text" placeholder="Password" onChange={e => setCustomer({first_name: customer.first_name, last_name: customer.last_name, date_of_birth: customer.date_of_birth, address: customer.address, password: e.target.value, library_address: customer.library_address})}></input>
                    <Select className='select' type="text" options={options.libraries} onChange={e => setCustomer({first_name: customer.first_name, last_name: customer.last_name, date_of_birth: customer.date_of_birth, address: customer.address, password: customer.password, library_address: e.value})}></Select>
                    <button className='admin-button' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Administration;