import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import AuthContext from "../../context/authContext";
import EvaluateSauce from "../Layout/EvaluateSauce";
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
        <>{sauceData._id === id &&
            <section className="sauce_page">
                <figure className="sauce_page_figure">
                    <img src={sauceData.imageUrl} alt="" className="sauce_page_figure_img" />
                    <figcaption className="sauce_page_figcaption">
                        <h1 className="sauce_page_content_name bold">{sauceData.name}</h1>
                        <h2 className="sauce_page_content_manufacturer">Par <span className="bold">{sauceData.manufacturer}</span></h2>
                        
                        <p className="sauce_page_content_heat bold">Force :</p>
                        <div className='sauce_page_ratings'>
                            <HeatScale heat={sauceData.heat} />
                        </div>
                        
                        <p className="sauce_page_content_desc_title bold">Description :</p>
                        <p className="sauce_page_content_desc_content">{sauceData.description}</p>

                        <p className="sauce_page_content_desc_title bold">Piment principal :</p>
                        <p className="sauce_page_content_desc_content">{sauceData.mainPepper}</p>
                        
                        <div className="sauce_page_vote">
                            <EvaluateSauce 
                                _id={sauceData._id}
                                usersLiked={sauceData.usersLiked}
                                usersDisliked={sauceData.usersDisliked}
                                likes={sauceData.likes}
                                dislikes={sauceData.dislikes}
                            />
                        </div>
                    </figcaption>
                </figure>
            </section>
        } </>
    )
}

export default DisplayOneSauce