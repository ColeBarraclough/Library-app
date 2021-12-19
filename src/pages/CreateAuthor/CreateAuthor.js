import { useState } from "react";
import "./CreateAuthor.css"

const CreateAuthor = () => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://localhost:44300/api/author`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth
            })

        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.state == true) {
                alert("Author has been created")
            }
        }
    }

    return(
        <div>
            <h1>Create Author</h1>
            <form onSubmit={submit}>
                <div className="author-cont">
                    <label className="author-label">
                        <p>First Name</p>
                        <input type={"text"} onChange={e => setFirstName(e.target.value)}></input>
                    </label>
                    <label className="author-label">
                        <p>Last Name</p>
                        <input type={"text"} onChange={e => setLastName(e.target.value)}></input>
                    </label>
                    <label className="author-label">
                        <p>Date Of Birth</p>
                        <input type={"date"} onChange={e => setDateOfBirth(e.target.value)}></input>
                    </label>
                    <button className="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAuthor;