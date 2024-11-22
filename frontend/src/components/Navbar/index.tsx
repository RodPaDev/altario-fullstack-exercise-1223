import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
                Generator
            </NavLink>
            <NavLink
                to="/payments"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
                Payments
            </NavLink>
        </nav>
    );
};


