import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import HeatScale from "../Layout/HeatScale";
import EvaluateSauce from "../Layout/EvaluateSauce";
import DeleteSauce from "./DeleteSauce";

const penIcon = <FontAwesomeIcon icon={faPen} />

const UpdateSauce = ({ propSauceData }) => {
    const authCtx = useContext(AuthContext);

    const [ modify, setModify ] = useState(false);
    const [ sauceDataUpdate, setSauceDataUpdate ] = useState(propSauceData)
    const [ dataPicture, setDataPicture ] = useState(propSauceData.imageUrl)
    const [ newDataPicture, setNewDataPicture ] = useState('')

    const [ errorServer, setErrorServer ] = useState('');

    const nameInputRef = useRef();
    const manufacturerInputRef = useRef();
    const heatInputRef = useRef();
    const descriptionInputRef = useRef();
    const mainPepperInputRef = useRef();

    useEffect(() => {
        setSauceDataUpdate(propSauceData);
        setDataPicture(propSauceData.imageUrl)
    }, [propSauceData, propSauceData.imageUrl])

    const modifyHandler = () => {
        setModify((modify) => !modify);
    }
    
    const changeHandler = () => {
        const enteredName = nameInputRef.current.value;
        const enteredManufacturer = manufacturerInputRef.current.value;
        const enteredHeat = heatInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredMainPepper = mainPepperInputRef.current.value;

        setSauceDataUpdate({
            ...propSauceData,
            'name': enteredName,
            'manufacturer': enteredManufacturer,
            'heat': enteredHeat,
            'description': enteredDescription,
            'mainPepper': enteredMainPepper
        })
    }

    const changeHandlerPicture = (e) => {
        let newPicture;

        if (e.target.files) {
            newPicture = URL.createObjectURL(e.target.files[0])
            setNewDataPicture(e.target.files[0])
        }
        setDataPicture(newPicture)
    }

    const url = `http://localhost:5000/api/sauces/${propSauceData._id}`

    const confirmUpdate = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('userId', authCtx.userId);
        formData.append('name', sauceDataUpdate.name);
        formData.append('manufacturer', sauceDataUpdate.manufacturer);
        formData.append('heat', sauceDataUpdate.heat);
        formData.append('description', sauceDataUpdate.description);
        formData.append('mainPepper', sauceDataUpdate.mainPepper);
        formData.append('image', newDataPicture);
 
        await axios.put(url, formData, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then(() => {
                modifyHandler();
                alert('Modification(s) enregistrée(s) !');
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })      
            });
    };

    return(
     <> <div className="sauce_page_picture_container">
            <img src={dataPicture} alt="" className="sauce_page_picture_container_img" />
            {modify && <>
                <label htmlFor="file"></label>
                <input 
                    type="file" 
                    name="file" 
                    id="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={changeHandlerPicture}
                    className='update_sauce_form_input_file'
                />
            </>}
        </div> 
        
        <article className="sauce_page_infos">
            <div>
            <header className="sauce_page_infos_header">
                {!modify ? 
                    <> <h1 className="sauce_page_infos_header_title bold">{sauceDataUpdate.name}</h1>
                    {sauceDataUpdate.userId === authCtx.userId &&
                        <div> 
                            <i onClick={modifyHandler} title='Éditer' className='sauce_page_infos_header_icon sauce_page_infos_header_icon_modify'>{penIcon}</i>
                            <DeleteSauce propSauceId={propSauceData._id} /> 
                        </div>
                    } </> 
                : <h1 className="sauce_page_infos_header_title sauce_page_infos_header_title_update bold">Modifier la sauce</h1>}
            </header> 
            
            <form action="" id='update-sauce-infos' className="sauce_form"> 
                {modify && <>
                    <label htmlFor="name" className="sauce_form_label">Nom :</label>
                        <br />
                        <input 
                            type='text'
                            name="name"
                            id="name"
                            onChange={changeHandler}
                            defaultValue={sauceDataUpdate.name}
                            ref={nameInputRef}
                            className='form_input sauce_form_input'
                        /> 
                </>}

                {!modify ? <>
                    <h2 className="sauce_page_infos_manufacturer">By 
                        <span className="bold">{sauceDataUpdate.manufacturer}</span>
                    </h2>
                </> : <>
                <label htmlFor="manufacturer" className="sauce_form_label">Fabriquant :</label>
                    <br />
                    <input 
                        type='text'
                        name="manufacturer"
                        id="manufacturer"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.manufacturer}
                        ref={manufacturerInputRef}
                        className='form_input sauce_form_input'
                    /> 
                </>}

                {!modify ? <>
                    <h3 className="sauce_page_infos_titles bold">Force :</h3>
                    <div className='sauce_ratings sauce_ratings_updateSauce'>
                        <HeatScale heat={sauceDataUpdate.heat} />
                    </div>
                </> : <>
                <label htmlFor="heat" className="sauce_form_label">Force : <span className="update_sauce_form_label_heat">{sauceDataUpdate.heat} / 5</span></label>
                    <br />
                    <input 
                        type='range'
                        name="heat"
                        id="heat"
                        min='1' max='5'
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.heat}
                        ref={heatInputRef}
                        className='sauce_form_input_range custom_slider'
                    />
                </>}
                
                <br />
                {!modify ? <>
                    <h3 className="sauce_page_infos_titles sauce_page_infos_titles_desc bold">Description :</h3>
                    <p className="sauce_page_infos_details">{sauceDataUpdate.description}</p>
                </> : <>
                <label htmlFor="description" className="sauce_form_label">Description :</label>
                    <br />
                    <textarea 
                        name="description"
                        id="description"
                        rows='4' cols='100'
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.description}
                        ref={descriptionInputRef}
                        className='form_input sauce_form_input sauce_form_input_desc'
                    /> 
                </>}

                {!modify ? <>
                    <h3 className="sauce_page_infos_titles bold">Piment principal :</h3>
                    <p className="sauce_page_infos_details">{sauceDataUpdate.mainPepper}</p>
                </> : <>
                <label className="sauce_form_label">Piment principal :</label>
                <br />
                    <input 
                        type='text'
                        name="mainPepper"
                        id="mainPepper"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.mainPepper}
                        ref={mainPepperInputRef}
                        className='form_input sauce_form_input'
                    /> 
                </>}
                <br />
                
                {modify && <>
                    <div className="sauce_form_buttons_container">
                        <button onClick={modifyHandler} className='sauce_form_button sauce_form_button_cancel'>Annuler</button>
                        <button type='submit' onClick={confirmUpdate} className='sauce_form_button sauce_form_button_confirm'>Enregistrer</button>
                    </div>
                    {errorServer && <p className="error center bold">{errorServer.message}</p>}</>
                }
            </form>
            
            <div className="sauce_page_vote">
                <EvaluateSauce 
                    _id={sauceDataUpdate._id}
                    usersLiked={sauceDataUpdate.usersLiked}
                    usersDisliked={sauceDataUpdate.usersDisliked}
                    likes={sauceDataUpdate.likes}
                    dislikes={sauceDataUpdate.dislikes}
                />
            </div>
            </div>
        </article> </>
    )
}

export default UpdateSauce