import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import AuthContext from "../../context/authContext";
import HeatScale from "../Layout/HeatScale";

const DisplayOneSauce = () => {
    const { id } = useParams()
    const authCtx = useContext(AuthContext);

    const [ sauceData, setSauceData ] = useState([])
    
    const getSauceData = useCallback(async () => {
        await axios ({
            method: 'GET',
            url: `http://localhost:5000/api/sauces/${id}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setSauceData(res.data) })
            .catch((err) => console.log(err))
    
    }, [id, authCtx.token]);

    useEffect(() => {
        getSauceData();
    }, [getSauceData]);

    return(
        <section className="sauce_page">
            <figure className="sauce_page_figure">
                <img src={sauceData.imageUrl} alt="" className="sauce_page_figure_img" />
                <figcaption className="sauce_page_figcaption">
                    <h1 className="sauce_page_content_name">{sauceData.name}</h1>
                    <h2 className="sauce_page_content_manufacturer">Par {sauceData.manufacturer}</h2>
                    <p>Force :</p>
                    <HeatScale heat={sauceData.heat} />
                    <p className="sauce_page_content_desc">Description : {sauceData.description}</p>
                </figcaption>
            </figure>
        </section>
    )
}

export default DisplayOneSauce