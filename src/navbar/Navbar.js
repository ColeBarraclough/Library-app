import './Navbar.css';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <div className='navbar'>
            <input className='Search' type="search" placeholder="Search" />
            {/* <Link to="/">
                <h1>Home</h1>
            </Link> */}
            <Link to="/login">
                <button className='Login-button'>Login</button>
            </Link>
        </div>
    );
}

export default Navbar;