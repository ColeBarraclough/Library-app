import './Administration.css'

const Administration = (props) => {
    return (
        <div>
            <h1>Add/Create Libraries </h1>
            <div>
                <form>
                    <input type="text" placeholder="Address"></input>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Website Address"></input>
                    <input type="text" placeholder="Administrator id"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <h1>Add/Create librarains </h1>
            <div className="active-registrations">
                <form>
                    <input type="text" placeholder="New ID"></input>
                    <input type="text" placeholder="First Name"></input>
                    <input type="text" placeholder="Last Name"></input>
                    <input type="text" placeholder="Phone number"></input>
                    <input type="text" placeholder="Address"></input>
                    <input type="text" placeholder="Social insurance number"></input>
                    <input type="text" placeholder="Librarian Address"></input>
                    <input type="text" placeholder="Password"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <h1>Add/Create customer </h1>
            <div className="active-registrations">
                <form>
                    <input type="text" placeholder="New ID"></input>
                    <input type="text" placeholder="First Name"></input>
                    <input type="text" placeholder="Last Name"></input>
                    <input type="text" placeholder="Date of Birth"></input>
                    <input type="text" placeholder="Address"></input>
                    <input type="text" placeholder="Password"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Administration;