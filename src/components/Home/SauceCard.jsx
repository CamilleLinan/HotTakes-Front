import RatingScale from '../Layout/RatingScale';
import SauceVote from '../Layout/SauceVote';

const SauceCard = (props) => {
    return(
        <figure className="card">
            <img src={props.imageUrl} alt="" className="card_img" />
            <figcaption className="card_figcaption">
                    <RatingScale heat={props.heat} />
                <h3 className="card_figcaption_title bold">{props.name}</h3>
                <p className="card_figcaption_subtitle">par {props.manufacturer}</p>
            </figcaption>
            <SauceVote likes={props.likes} dislikes={props.dislikes} />
        </figure>
    )
}

export default SauceCard