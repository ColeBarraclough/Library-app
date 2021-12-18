import './Navbar.css';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = ({token, setSearchTerm}) => {

    const history = useHistory();

    const [localSearchTerm, setLocalSearchTerm] = useState();

    const search = (event) => {
        if (event.key === "Enter") {
            setSearchTerm(localSearchTerm);
            history.push("/")
            history.push("/search-results")

        }
    }

    if (token.includes("C")) {
        return(
            <div className='navbar'>
                <input className='Search' type="search" placeholder="Search"  onKeyPress={search} onChange={e => setLocalSearchTerm(e.target.value)}/>
                <div className='other-nav'>
                    <Link to="/">
                        <img src="home-svgrepo-com.svg" id="home-svg" width="50px" height="50px" alt="Home here"/>
                    </Link>
                    
                    <Link to="/reservation-client">
                        <img src="reserved.png" width="50px" height="50px" alt="Reservations"/>
                    </Link>
                    <Link to="/login">
                        <button className='Login-button'>Login</button>
                    </Link>
                    <Link to="/account-info">
                        <img src="account1.svg" width="50px" height="50px" alt="Account here"/>
                    </Link>
                </div>
            </div>
        );
    } else {
        return(
            <div className='navbar'>
                <input className='Search' type="search" placeholder="Search"  onKeyPress={search} onChange={e => setLocalSearchTerm(e.target.value)}/>
                <div className='other-nav-lib'>
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
                    <Link to="/reservation-librarian">
                        <img src="reserved.png" width="50px" height="50px" alt="Reservations"/>
                    </Link>
                    {token.includes("A") ? <div>
                                                <Link to="/administration">
                                                    <img src="admin.png" width="50px" height="50px" alt="Admin"/>
                                                </Link>
                                            </div>
                                            : null}
                </div>
            </div>
        );
    }

}

export default Navbar;