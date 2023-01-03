import { NavLink } from "react-router-dom"
import logo from '../../styles/img/hottakes-logo.png'

const Header = () => {
    return(
        <header className="header">
            <div className="header_nav">
                <nav>
                    <NavLink
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_1 header_nav_link_active" : "header_nav_link header_nav_link_1 header_nav_link_inactive")} 
                        title='Accueil'
                        end to='/'
                    >
                        Accueil
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_1 header_nav_link_active" : "header_nav_link header_nav_link_1 header_nav_link_inactive")}
                        title='Ajouter une sauce'
                    >
                        Ajouter une sauce
                    </NavLink>
                </nav>
                <img src={logo} alt='hottakes-logo' className="header_logo" />
                <nav>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                        title='Mon compte'
                    >
                        Mon compte
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                        title='Se connecter/Se déconnecter'
                        end to='Login'
                    >
                        Login/Log out
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header