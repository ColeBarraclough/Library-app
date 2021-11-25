import './CreateAccount.css'

const CreateAccount = (props) => {
    return (
        <div>
            <h1>Create A new Account</h1>
            <form>
                <input type="text" placeholder="First Name"></input>
                <input type="text" placeholder="Last Name"></input>
                <h6> Date of Birth </h6>
                <input type="date" ></input>
                <input type="text" placeholder="Address"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateAccount;