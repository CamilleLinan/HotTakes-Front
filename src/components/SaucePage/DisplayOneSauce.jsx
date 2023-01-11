import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import AuthContext from "../../context/authContext";
import EvaluateSauce from "../Layout/EvaluateSauce";
import UpdateSauce from "./UpdateSauce";

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
                        <UpdateSauce propSauceData={sauceData} title='Éditer' />
                        
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