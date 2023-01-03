import { NavLink } from "react-router-dom"
import logo from '../../styles/img/hottakes-logo.png'

const Header = () => {
    return(
        <header className="header">
            <div className="header_nav">
                <nav>
                    <NavLink
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_1 header_nav_link_active" : "header_nav_link header_nav_link_1 header_nav_link_inactive")} 
                        href=""
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_1 header_nav_link_active" : "header_nav_link header_nav_link_1 header_nav_link_inactive")}
                        href=""
                    >
                        Add sauce
                    </NavLink>
                </nav>
                <img src={logo} alt='hottakes-logo' className="header_logo" />
                <nav>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                        href=""
                    >
                        Account
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                        href=""
                    >
                        Login/Log out
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header