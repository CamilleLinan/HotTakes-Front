import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext";
import logo from '../../styles/img/hottakes-logo.png'

const homeIcon = <FontAwesomeIcon icon={faHouse} />
const plusIcon = <FontAwesomeIcon icon={faPlus} />
const accountIcon = <FontAwesomeIcon icon={faCircleUser} />
const logIcon = <FontAwesomeIcon icon={faRightFromBracket} />

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return(
        <header className="header">
            <div className="header_nav">
                <nav>
                    <NavLink
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_1 header_nav_link_active" : "header_nav_link header_nav_link_1 header_nav_link_inactive")} 
                        title='Accueil'
                        end to='/'
                    >
                        <span className="header_nav_text">Accueil</span>
                        <i className="header_nav_icon">{homeIcon}</i>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_1 header_nav_link_active" : "header_nav_link header_nav_link_1 header_nav_link_inactive")}
                        title='Ajouter une sauce'
                        end to='/addSauce'
                    >
                        <span className="header_nav_text">Ajouter une sauce</span>
                        <i className="header_nav_icon">{plusIcon}</i>
                    </NavLink>
                </nav>
                <img src={logo} alt='hottakes-logo' className="header_logo" />
                <nav>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                        title='Mon compte'
                    >
                        <span className="header_nav_text">Mon compte</span>
                        <i className="header_nav_icon">{accountIcon}</i>
                    </NavLink>
                    {isLoggedIn ? 
                    <NavLink 
                        className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                        title='Se déconnecter'
                        onClick={authCtx.logout}
                        end to='/'
                    >
                        <span className="header_nav_text">Se déconnecter</span>
                        <i className="header_nav_icon">{logIcon}</i>
                    </NavLink> :
                    <NavLink 
                    className={({ isActive }) => (isActive ? "header_nav_link header_nav_link_2 header_nav_link_active" : "header_nav_link header_nav_link_2 header_nav_link_inactive")}
                    title='Se connecter'
                    end to='/Login'
                >
                    <span className="header_nav_text">Se connecter</span>
                    <i className="header_nav_icon">{logIcon}</i>
                </NavLink> }
                </nav>
            </div>
        </header>
    )
}

export default Header