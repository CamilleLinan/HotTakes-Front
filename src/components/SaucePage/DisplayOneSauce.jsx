import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import AuthContext from "../../context/authContext";
import UpdateSauce from "./UpdateSauce";

const DisplayOneSauce = () => {
    const { id } = useParams()
    const authCtx = useContext(AuthContext);

    const [ sauceData, setSauceData ] = useState([])
    const [ errorServer, setErrorServer ] = useState('');

    const getSauceData = useCallback(async () => {
        await axios ({
            method: 'GET',
            url: `http://localhost:5000/api/sauces/${id}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setSauceData(res.data) })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })      
            });
    }, [id, authCtx.token, errorServer]);

    useEffect(() => {
        getSauceData();
    }, [getSauceData]);

    return(
        <>
            {sauceData._id === id &&
                <section className="sauce_page">
                    <div className="sauce_page_figure">
                        <UpdateSauce propSauceData={sauceData} title='Éditer' />
                    </div>
                </section>
            }

            {errorServer && <><br /><p className="error text_center bold">{errorServer.message}</p></>}
        </>
    )
}

export default DisplayOneSauce