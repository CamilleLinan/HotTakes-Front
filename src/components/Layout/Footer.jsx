import { NavLink } from 'react-router-dom'
import logo from '../../styles/img/hottakes-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const facebookIcon = <FontAwesomeIcon icon={faFacebook} />
const twitterIcon = <FontAwesomeIcon icon={faTwitter} />
const instagramIcon = <FontAwesomeIcon icon={faInstagram} />

const Footer = () => {
    return (
        <footer className='footer'>
            <img src={logo} alt='hottakes-logo' className='footer_img' />
            <div className='footer_links'>
                <NavLink className='footer_links_link' end to='#' title='page facebook'>
                    {facebookIcon}
                </NavLink>
                <NavLink className='footer_links_link' end to='#' title='page twitter'>
                    {twitterIcon}
                </NavLink>
                <NavLink className='footer_links_link' end to='#' title='page instagram'>
                    {instagramIcon}
                </NavLink>
            </div>
            <div className='footer_about'>
                <p className='footer_about_text'>Designed by Liñan Camille ©</p>
            </div>
        </footer>
    )
}
 
export default Footer