import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext";
import ConfirmModal from "../Layout/ConfirmModal";

const trashIcon = <FontAwesomeIcon icon={faTrash} />

const DeleteSauce = ({ propSauceId }) => {
    const authCtx = useContext(AuthContext);    

    const [ popUpConfirm, setPopUpConfirm ] = useState(false);
    const [ errorServer, setErrorServer ] = useState('');
    
    const navigate = useNavigate()

    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const deleteHandler = () => {
        setPopUpConfirm(true)
    }
    
    // Utilisation de dotenv
    const API_URL = process.env.REACT_APP_API_URL

    // Supprimer une sauce
    const confirmDelete = async (e) => {
        e.preventDefault();

        await axios({
            method:'DELETE',
            url: `${API_URL}/sauces/${propSauceId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then(() => {
                alert('La sauce a bien été supprimée !');
                navigate('/');
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' }) 
            })
    };

    return (
        <>
        {popUpConfirm && <ConfirmModal
            title='Confirmer la suppression'
            message='Êtes-vous sûr de vouloir supprimer cette sauce ?'
            error={errorServer}
            errorMessage={errorServer.message}
            onCancel={cancelConfirm}
            onConfirm={confirmDelete}
        />}
            <i onClick={deleteHandler} title='Supprimer' className='sauce_page_infos_header_icon sauce_page_infos_header_icon_delete'>{trashIcon}</i>
        </>
    )
}

export default DeleteSauce