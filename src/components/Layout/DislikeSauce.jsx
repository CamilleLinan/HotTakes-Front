import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext";

const dislikeIcon = <FontAwesomeIcon icon={faThumbsDown} />
const removeDislikeIcon = <FontAwesomeIcon icon={faThumbsDown} />

const DislikeSauce = ({ propSauce }) => {
    const authCtx = useContext(AuthContext);
    const userId = authCtx.userId;
    const sauceId = propSauce._id;
    const usersDisliked = propSauce.usersDisliked;
    
    const [ dislikeUpdate, setDislikeUpdate ] = useState(propSauce.dislikes)
    const [ isDisliked, setIsDisliked ] = useState(false);

    useEffect(() => {
        setDislikeUpdate(propSauce.dislikes);
    }, [propSauce.dislikes])

    // Fonction ajouter d'un like
    const addDislike = async () => {
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/sauces/${sauceId}/dislike`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                dislike: 1
            }
        })
            .then(() => {
                setIsDisliked(true);
                setDislikeUpdate(dislikeUpdate+1);
            })
            .catch((err) => {console.log(err)});
    };

    // Fonction retirer un like
    const removeDislike = async () => {
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/sauces/${sauceId}/dislike`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                dislike: -1
            }
        })
            .then(() => {
                setIsDisliked(false);
                setDislikeUpdate(dislikeUpdate-1);
            })
            .catch((err) => {console.log(err)});
    };

    useEffect(() => {
        const userFound = usersDisliked.find(userDisliked => userDisliked === userId);
        if(userFound) {
            setIsDisliked(true);
        }
    }, [userId, usersDisliked])

    return(
        <>
            {!isDisliked ?
                <span onClick={addDislike} className='card_vote_icon'>{dislikeIcon} {dislikeUpdate}</span>
                : <span onClick={removeDislike} className='card_vote_icon card_vote_icon_dislike'>{removeDislikeIcon} {dislikeUpdate}</span>
            }
        </>
    )
}

export default DislikeSauce