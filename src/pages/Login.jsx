import { useState } from 'react';
import logo from '../styles/img/hottakes-logo.png'
import SignInForm from '../components/Login/SignInForm';
import SignUpForm from '../components/Login/SignUpForm';
import { NavLink } from 'react-router-dom';


const Login = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState('');

    // Choix de l'affichage entre SignUpForm et SignInForm
    const handleModals = (e) => {
        setSignUpModal(e.target.id === 'signup');
        setSignInModal(e.target.id === 'signin');
    }

    return(
        <div className='login'>
            <header className="login_header">
                <img src={logo} alt="hottakes-logo" className="login_header_logo" />
            </header>
            <section className="login_section">
                <header className="login_section_header">
                    <button onClick={handleModals} id="signup" className={signUpModal ? "active bold" : "inactive bold"}>S'inscrire</button>
                    <button onClick={handleModals} id="signin" className={signInModal ? "active bold" : "inactive bold"}>Se connecter</button>
                </header>
                <br/>
                <article className="login_section_form">
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                </article>
            </section>
            <footer className='login_footer'>
                <NavLink title='Accueil' end to='/' className='login_footer_navlink'>Aller à la page d'accueil</NavLink>
            </footer>
        </div>
    )
}

export default Login