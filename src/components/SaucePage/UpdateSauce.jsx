import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import HeatScale from "../Layout/HeatScale";

const penIcon = <FontAwesomeIcon icon={faPen} />

const UpdateSauce = ({ propSauceData }) => {
    const authCtx = useContext(AuthContext);

    const [ sauceDataUpdate, setSauceDataUpdate ] = useState(propSauceData);
    const [ modify, setModify ] = useState(false);

    const nameInputRef = useRef();
    const manufacturerInputRef = useRef();
    const heatInputRef = useRef();
    const descriptionInputRef = useRef();
    const mainPepperInputRef = useRef();

    useEffect(() => {
        setSauceDataUpdate(propSauceData);
    }, [propSauceData])

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

    // Utilisation de YupResolver
    const formSchema = Yup.object().shape({
        name: Yup.string().trim()
            .min(2, 'Doit contenir minimum 2 caractères')
            .max(30, 'Doit contenir maximum 30 caractères'),
        manufacturer: Yup.string().trim()
            .min(2, 'Doit contenir minimum 2 caractères')
            .max(30, 'Doit contenir maximum 30 caractères'),
        heat: Yup.number(),
        description: Yup.string(),
        mainPepper: Yup.string()
    });

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit } = useForm(formOptions, {
        defaultValue: {    
            name: '',
            manufacturer: '',
            heat: '',
            description: '',
            mainPepper: ''
        }
    });

    const onSubmit = async (data) => {
        if (!modify) {
            await axios({
                method: "PUT",
                url: `http://localhost:5000/api/sauces/${propSauceData._id}`,
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                },
                data
            })
                .then(() => {
                    setSauceDataUpdate(data);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    };

    return(
        <>
            <section className="form_container">
                {modify && <p>Modifier la sauce</p> }
                <form action="" onSubmit={handleSubmit(onSubmit)} id='update-sauce-infos'> 

                {!modify &&  <i onClick={modifyHandler} title='Éditer' className='trending_container_post_icons_icon trending_container_post_icons_icon_modify'>{penIcon}</i>}
                    {!modify ? <>
                        <h1 className="sauce_page_content_name bold">{sauceDataUpdate.name}</h1>
                    </> : <>
                    <label htmlFor="name">Nom :</label>
                    <br />
                    <input 
                        type='text'
                        name="name"
                        id="name"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.name}
                        ref={nameInputRef}
                        className='form_input'
                        {...register('name')}
                    /> 
                    </>}

                    {!modify ? <>
                        <h2 className="sauce_page_content_manufacturer">Par <span className="bold">{sauceDataUpdate.manufacturer}</span></h2>
                    </> : <>
                    <label htmlFor="manufacturer">Fabriquant :</label>
                    <br />
                    <input 
                        type='text'
                        name="manufacturer"
                        id="manufacturer"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.manufacturer}
                        ref={manufacturerInputRef}
                        {...register('manufacturer')}
                    /> 
                    </>}

                    
                    {!modify ? <>
                        <p className="sauce_page_content_heat bold">Force :</p>
                        <div className='sauce_page_ratings'>
                            <HeatScale heat={sauceDataUpdate.heat} />
                        </div>
                    </> : <>
                    <label htmlFor="heat">Force :</label>
                    <br />
                    <input 
                        type='range'
                        name="heat"
                        id="heat"
                        min='1' max='5'
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.heat}
                        ref={heatInputRef}
                        {...register('heat')}
                    /> 
                    </>}
                    
                    {!modify ? <>
                        <p className="sauce_page_content_desc_title bold">Description :</p>
                        <p className="sauce_page_content_desc_content">{sauceDataUpdate.description}</p>
                    </> : <>
                    <label htmlFor="description" className="sauce_page_content_desc_title bold">Description :</label>
                    <br />
                    <input 
                        type='text'
                        name="description"
                        id="description"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.description}
                        ref={descriptionInputRef}
                        {...register('description')}
                    /> 
                    </>}

                    {!modify ? <>
                        <p className="sauce_page_content_desc_title bold">Piment principal :</p>
                        <p className="sauce_page_content_desc_content">{sauceDataUpdate.mainPepper}</p>
                    </> : <>
                    <label className="sauce_page_content_desc_title bold">Piment principal :</label>
                    <br />
                    <input 
                        type='text'
                        name="mainPepper"
                        id="mainPepper"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.mainPepper}
                        ref={mainPepperInputRef}
                        {...register('mainPepper')}
                    /> 
                    </>}
                    <br />
                    {modify &&
                    <button type='submit' onClick={modifyHandler}>Enregistrer</button>}
                </form>
            </section>
        </>
    )
}

export default UpdateSauce