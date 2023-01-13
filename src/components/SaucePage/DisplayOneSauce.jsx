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
                <section className="bg_section sauce_page">
                    <UpdateSauce propSauceData={sauceData} title='Éditer' />
                </section>
            }

            {errorServer && <><br /><p className="error center bold">{errorServer.message}</p></>}
        </>
    )
}

export default DisplayOneSauce