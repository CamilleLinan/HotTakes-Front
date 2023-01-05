import axios from "axios"
import { useContext, useEffect, useCallback, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/authContext"
import SauceCard from "./SauceCard"

const fireIcon = <FontAwesomeIcon icon={faFire} />

const DisplaySauces = () => {
    const [ sauceData, setSauceData ] = useState([])

    const authCtx = useContext(AuthContext);

    const getSauceData = useCallback(async () => {
        await axios ({
            method: 'GET',
            url: 'http://localhost:5000/api/sauces',
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setSauceData(res.data); console.log(res.data) })
            .catch((err) => console.log(err))
    
    }, [authCtx.token]);

    useEffect(() => {
        getSauceData();
    }, [getSauceData]);

    return(
        <>
        <h1 className="title_home center">Votez pour votre sauce piquante préférée !</h1>
            <section className="sauces">
                <div className="sauces_section_name">
                    <i className="sauces_section_name_icon">{fireIcon}</i>
                    <h2 className="sauces_section_name_title">Toutes les sauces</h2>
                </div>
                {sauceData.length > 0 ?
                    <ul className="sauces_list">
                        <>{sauceData.map((sauce, i) => (
                            <li key={sauce._id}>
                                <SauceCard 
                                    imageUrl={sauce.imageUrl}
                                    heat={sauce.heat}
                                    name={sauce.name}
                                    manufacturer={sauce.manufacturer}
                                    likes={sauce.likes}
                                    dislikes={sauce.dislikes}
                                />
                            </li>
                        ))}</>
                    </ul>
                : <p>Il n'y a aucune sauce pour le moment</p>}
            </section>
        </>
    )
}

export default DisplaySauces