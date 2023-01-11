import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';

const pepper = <FontAwesomeIcon icon={faPepperHot} />
const pepperGrey = <FontAwesomeIcon icon={faPepperHot} />

const HeatScale = (props) => {
    const scaleValue = props.heat

    const range = [1, 2, 3, 4, 5]

    return (
        <>
            {range.map((rangeElem) =>
                scaleValue >= rangeElem ? 
                    <span key={rangeElem.toString()} className='sauce_ratings_pepper'>{pepper}</span> 
                    : <span key={rangeElem.toString()} className='sauce_ratings_pepper sauce_ratings_pepper_grey'>{pepperGrey}</span>
            )}
        </>
    )
}

export default HeatScale;