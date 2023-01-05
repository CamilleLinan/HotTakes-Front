import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} />
const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} />

const SauceVote = (props) => {
    return(
        <div className='card_vote'>
            <i className='card_vote_icon'>{thumbsUp}</i>
            <span className='card_vote_number'>{props.likes}</span>
            <i className='card_vote_icon'>{thumbsDown}</i>
            <span className='card_vote_number'>{props.dislikes}</span>
        </div>
    )
}

export default SauceVote