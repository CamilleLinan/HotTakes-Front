import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/authContext";
import { useForm } from "react-hook-form";

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

    const changeHandler = (e) => {
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

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            manufacturer: '',
            heat: '',
            description: '',
            mainPepper: '',
        }
    })

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
            <div className="backdrop">
                <section className="form_container">
                    <h3>Modifier la sauce</h3>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Nom :</label>
                    {!modify ? <>
                        <p>{sauceDataUpdate.name}</p>
                    </> : <>
                    <input 
                        type='text'
                        name="name"
                        id="name"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.name}
                        ref={nameInputRef}
                        {...register('name')}
                    /> 
                    </>}
                    {!modify ? <>
                        <p>{sauceDataUpdate.manufacturer}</p>
                    </> : <>
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
                        <p>{sauceDataUpdate.heat}</p>
                    </> : <>
                    <input 
                        type='cursor'
                        name="heat"
                        id="heat"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.heat}
                        ref={heatInputRef}
                        {...register('heat')}
                    /> 
                    </>}
                    {!modify ? <>
                        <p>{sauceDataUpdate.description}</p>
                    </> : <>
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
                        <p>{sauceDataUpdate.mainPepper}</p>
                    </> : <>
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
                    {!modify ?
                    <button onClick={modifyHandler}>Modifier</button>
                    : <button onClick={modifyHandler}>Enregistrer</button>}
                    </form>
                </section>
            </div>
        </>
    )
}

export default UpdateSauce