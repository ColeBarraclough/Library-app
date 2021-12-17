import './Navbar.css';
import {Link} from 'react-router-dom'

const Navbar = ({token}) => {

    if (token.includes("C")) {
        return(
            <div className='navbar'>
                <input className='Search' type="search" placeholder="Search" />
                {/* <Link to="/">
                    <h1>Home</h1>
                </Link> */}
                <Link to="/">
                    <img src="home-svgrepo-com.svg" width="50px" height="50px" alt="Home here"/>
                </Link>
                <Link to="/login">
                    <button className='Login-button'>Login</button>
                </Link>
                <Link to="/account-info">
                    <img src="account1.svg" width="50px" height="50px" alt="Account here"/>
                </Link>
                <Link to="/add-media">
                    <img src="add.svg" width="50px" height="50px" alt="Add media"/>
                </Link>
                <Link to="/reservation/librarian">
                    <img src="reserved.png" width="50px" height="50px" alt="Reservations"/>
                </Link>
            </div>
        );
    } else {
        return(
            <div className='navbar'>
                <input className='Search' type="search" placeholder="Search" />
                {/* <Link to="/">
                    <h1>Home</h1>
                </Link> */}
                <Link to="/">
                    <img src="home-svgrepo-com.svg" width="50px" height="50px" alt="Home here"/>
                </Link>
                <Link to="/login">
                    <button className='Login-button'>Login</button>
                </Link>
                <Link to="/account-info">
                    <img src="account1.svg" width="50px" height="50px" alt="Account here"/>
                </Link>
                <Link to="/add-media">
                    <img src="add.svg" width="50px" height="50px" alt="Add media"/>
                </Link>
                <Link to="/reservation/librarian">
                    <img src="reserved.png" width="50px" height="50px" alt="Reservations"/>
                </Link>
            </div>
        );
    }

}

export default Navbar;