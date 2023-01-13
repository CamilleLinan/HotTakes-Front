import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext";
import ConfirmModal from "../Layout/ConfirmModal";

const trashIcon = <FontAwesomeIcon icon={faTrash} />

const DeleteSauce = ({ propSauceId }) => {
        
    const [ popUpConfirm, setPopUpConfirm ] = useState(false);
    const [ errorServer, setErrorServer ] = useState('');
    
    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const deleteHandler = () => {
        setPopUpConfirm(true)
    }

    // Utilisation du context
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate()
    
    const confirmDelete = async (e) => {
        e.preventDefault();

        await axios({
            method:'DELETE',
            url: `http://localhost:5000/api/sauces/${propSauceId}`,
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