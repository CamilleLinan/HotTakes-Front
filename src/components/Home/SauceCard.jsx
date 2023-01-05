import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import RatingScale from './RatingScale';

const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} />
const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} />

const SauceCard = (props) => {
    return(
        <figure className="card">
            <img src={props.imageUrl} alt="" className="card_img" />
            <figcaption className="card_figcaption">
                    <RatingScale heat={props.heat} />
                <h3 className="card_figcaption_title bold">{props.name}</h3>
                <p className="card_figcaption_subtitle">par {props.manufacturer}</p>
            </figcaption>
            <div className='card_vote'>
                <i className='card_vote_icon'>{thumbsUp}</i>
                <span className='card_vote_number'>{props.likes}</span>
                <i className='card_vote_icon'>{thumbsDown}</i>
                <span className='card_vote_number'>{props.dislikes}</span>
            </div>
        </figure>
    )
}

export default SauceCard