import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import AuthContext from "../../context/authContext";
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
                <div className="sauce_page_figure">
                    <UpdateSauce propSauceData={sauceData} title='Éditer' />
                </div>
            </section>
        } </>
    )
}

export default DisplayOneSauce