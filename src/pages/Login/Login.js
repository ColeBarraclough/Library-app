import './Login.css'
import { useState } from 'react'


const Login = () => {
    const [token, setToken] = useState();

    return (
        <div className="Login">
            <form>
                <label>
                    <p>Card ID / Employee ID</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;