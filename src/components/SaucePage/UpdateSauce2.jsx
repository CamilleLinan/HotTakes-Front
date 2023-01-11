import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UpdateSauceModal from "./UpdateSauceModal";

const penIcon = <FontAwesomeIcon icon={faPen} />

const UpdateSauce2 = ({ propSauceData }) => {
    const authCtx = useContext(AuthContext);

    const [ popUpConfirm, setPopUpConfirm ] = useState(false);

    const [ sauceDataUpdate, setSauceDataUpdate ] = useState(propSauceData);

    const nameInputRef = useRef();
    const manufacturerInputRef = useRef();
    const heatInputRef = useRef();
    const descriptionInputRef = useRef();
    const mainPepperInputRef = useRef();

    useEffect(() => {
        setSauceDataUpdate(propSauceData);
    }, [propSauceData])

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

    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const updateHandler = () => {
        setPopUpConfirm(true)
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
 
        await axios.put(url, formData, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then(() => {
                setPopUpConfirm(false);
                alert('Modification(s) enregistrée(s) !');
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return(
        <>
        {popUpConfirm && <UpdateSauceModal
            changeHandler={changeHandler}
            // Input name
            name={sauceDataUpdate.name}
            nameInputRef={nameInputRef}
            // Input manufacturer
            manufacturer={sauceDataUpdate.manufacturer}
            manufacturerInputRef={manufacturerInputRef}
            // Input heat
            heat={sauceDataUpdate.heat}
            heatInputRef={heatInputRef}
            // Input description
            description={sauceDataUpdate.description}
            descriptionInputRef={descriptionInputRef}
            // Input name
            mainPepper={sauceDataUpdate.mainPepper}
            mainPepperInputRef={mainPepperInputRef}
            // Buttons
            onCancel={cancelConfirm}
            onConfirm={confirmUpdate}
        />}
            <i onClick={updateHandler} title='Éditer' className='trending_container_post_icons_icon trending_container_post_icons_icon_modify'>{penIcon}</i>
        </>
    )
}

export default UpdateSauce2