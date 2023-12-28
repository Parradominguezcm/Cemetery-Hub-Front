import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'

export default function Header({ loggedIn, setLoggedIn }) {

    const logout = () => {
        Cookies.remove('token')
        setLoggedIn(false)
    }

    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg bg-light ">
                <div className="container-fluid">
                    <h2 className="navbar-brand">Cemetery hub</h2>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="dropdown-item"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createTask" className="dropdown-item"> Create task </Link>
                            </li>
                            <li className="nav-item justify-content-end">
                                {!loggedIn && <Link to="/login" className="dropdown-item"> Log in </Link>}
                            </li>
                            <li className="nav-item justify-content-end">
                                <Link to="/signup" className="dropdown-item"> Sign up </Link>
                            </li>
                            <li className="nav-item justify-content-end">
                                {loggedIn && <button className="button" onClick={logout}> Logout </button>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    )
}

Header.propTypes = {
    setLogin: PropTypes.func,
    loggedIn: PropTypes.bool,
}