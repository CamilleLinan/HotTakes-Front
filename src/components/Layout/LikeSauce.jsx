import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext";

const likeIcon = <FontAwesomeIcon icon={faThumbsUp} />
const removeLikeIcon = <FontAwesomeIcon icon={faThumbsUp} />

const LikeSauce = ({ propSauce }) => {
    const authCtx = useContext(AuthContext);
    const userId = authCtx.userId;
    const sauceId = propSauce._id;
    const usersLiked = propSauce.usersLiked;
    
    const [ likeUpdate, setLikeUpdate ] = useState(propSauce.likes)
    const [ isLiked, setIsLiked ] = useState(false);

    useEffect(() => {
        setLikeUpdate(propSauce.likes);
    }, [propSauce.likes])

    // Fonction ajouter d'un like
    const addLike = async () => {
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/sauces/${sauceId}/like`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                like: 1
            }
        })
            .then(() => {
                setIsLiked(true);
                setLikeUpdate(likeUpdate+1);
            })
            .catch((err) => {console.log(err)});
    };

    // Fonction retirer un like
    const removeLike = async () => {
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/sauces/${sauceId}/like`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                like: -1
            }
        })
            .then(() => {
                setIsLiked(false);
                setLikeUpdate(likeUpdate-1);
            })
            .catch((err) => {console.log(err)});
    };

    useEffect(() => {
        const userFound = usersLiked.find(userLiked => userLiked === userId);
        if(userFound) {
            setIsLiked(true);
        }
    }, [userId, usersLiked])

    return(
        <>
            {!isLiked ?
                <span onClick={addLike} className='card_vote_icon'>{likeIcon} {likeUpdate}</span>
                : <span onClick={removeLike} className='card_vote_icon card_vote_icon_like'>{removeLikeIcon} {likeUpdate}</span>
            }
        </>
    )
}

export default LikeSauce