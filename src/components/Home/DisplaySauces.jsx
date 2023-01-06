import axios from "axios"
import { useContext, useEffect, useCallback, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext"
import HeatScale from "../Layout/HeatScale";
import EvaluateSauce from "../Layout/EvaluateSauce";

const fireIcon = <FontAwesomeIcon icon={faFire} />

const DisplaySauces = () => {
    const [ saucesData, setSaucesData ] = useState([])

    const authCtx = useContext(AuthContext);

    const getSaucesData = useCallback(async () => {
        await axios ({
            method: 'GET',
            url: 'http://localhost:5000/api/sauces',
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setSaucesData(res.data) })
            .catch((err) => console.log(err))
    
    }, [authCtx.token]);

    useEffect(() => {
        getSaucesData();
    }, [getSaucesData]);

    return(
        <>
        <h1 className="title_home center bold">Votez pour votre sauce piquante préférée !</h1>
            <section className="sauces">
                <div className="sauces_section_name">
                    <i className="sauces_section_name_icon">{fireIcon}</i>
                    <h2 className="sauces_section_name_title bold">Toutes les sauces</h2>
                </div>
                {saucesData.length > 0 ?
                    <ul className="sauces_list">
                        <>{saucesData.map((sauce, i) => (
                            <li key={sauce._id}>
                                <figure className="card">
                                    <a href={'/sauce/' + sauce._id}>
                                        <img src={sauce.imageUrl} alt="" className="card_img" />
                                        <figcaption className="card_figcaption">
                                            <HeatScale heat={sauce.heat} />
                                            <h3 className="card_figcaption_title bold">{sauce.name}</h3>
                                            <p className="card_figcaption_subtitle">par {sauce.manufacturer}</p>
                                        </figcaption>
                                    </a>
                                    <div className='card_vote'>
                                        <EvaluateSauce 
                                            _id={sauce._id}
                                            usersLiked={sauce.usersLiked}
                                            usersDisliked={sauce.usersDisliked}
                                            likes={sauce.likes}
                                            dislikes={sauce.dislikes}
                                        />
                                    </div>
                                </figure>
                            </li>
                        ))}</>
                    </ul>
                : <p>Il n'y a aucune sauce pour le moment</p>}
            </section>
        </>
    )
}

export default DisplaySauces