import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext";

const likeIcon = <FontAwesomeIcon icon={faThumbsUp} />
const removeLikeIcon = <FontAwesomeIcon icon={faThumbsUp} />
const dislikeIcon = <FontAwesomeIcon icon={faThumbsDown} />
const removeDislikeIcon = <FontAwesomeIcon icon={faThumbsDown} />

const EvaluateSauce = (props) => {
    const authCtx = useContext(AuthContext);
    const userId = authCtx.userId;
    const sauceId = props._id;
    const usersLiked = props.usersLiked;
    const usersDisliked = props.usersDisliked;
    
    const [ likeUpdate, setLikeUpdate ] = useState(props.likes)
    const [ isLiked, setIsLiked ] = useState(false);
    const [ dislikeUpdate, setDislikeUpdate ] = useState(props.dislikes)
    const [ isDisliked, setIsDisliked ] = useState(false);

    useEffect(() => {
        setLikeUpdate(props.likes);
        setDislikeUpdate(props.dislikes);
    }, [props.likes, props.dislikes])

    // Fonction ajouter un like
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

    // Fonction ajouter un dislike
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

    // Fonction retirer un dislike
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
        const userFound = usersLiked.find(userLiked => userLiked === userId);
        if(userFound) {
            setIsLiked(true);
        }
    }, [userId, usersLiked])

    useEffect(() => {
        const userFound = usersDisliked.find(userDisliked => userDisliked === userId);
        if(userFound) {
            setIsDisliked(true);
        }
    }, [userId, usersDisliked])

    return(
        <>
            {!isLiked ?
                <button onClick={addLike} disabled={isDisliked} id='notlike' className='card_vote_icon'>{likeIcon} {likeUpdate}</button>
                : <button onClick={removeLike} className='card_vote_icon card_vote_icon_like'>{removeLikeIcon} {likeUpdate}</button>
            }
            {!isDisliked ?
                <button onClick={addDislike} disabled={isLiked} id='notdislike' className='card_vote_icon'>{dislikeIcon} {dislikeUpdate}</button>
                : <button onClick={removeDislike} className='card_vote_icon card_vote_icon_dislike'>{removeDislikeIcon} {dislikeUpdate}</button>
            }
        </>
    )
}

export default EvaluateSauce