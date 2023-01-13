import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const AddSauceForm = () => {
    const authCtx = useContext(AuthContext);

    const [ sauceName, setSauceName ] = useState('');
    const [ sauceManufacturer, setSauceManufacturer ] = useState('');
    const [ sauceHeat, setSauceHeat ] = useState('');
    const [ sauceDescription, setSauceDescription ] = useState('');
    const [ sauceMainPepper, setSauceMainPepper ] = useState('');
    const [ previewPicture, setPreviewPicture ] = useState('');
    const [ saucePicture, setSaucePicture ] = useState('');

    const [ errorServer, setErrorServer ] = useState('');
    
    const changeHandlerPicture = (e) => {
        let newPicture;

        if (e.target.files) {
            newPicture = URL.createObjectURL(e.target.files[0])
            setPreviewPicture(newPicture)
        }
        setSaucePicture(e.target.files[0]) 
    }

    const url = `http://localhost:5000/api/sauces`
    const navigate = useNavigate()
    
    const onSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('userId', authCtx.userId);
        formData.append('name', sauceName);
        formData.append('manufacturer', sauceManufacturer);
        formData.append('heat', sauceHeat);
        formData.append('description', sauceDescription);
        formData.append('mainPepper', sauceMainPepper);
        formData.append('image', saucePicture);

        await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
                'Content-Type': `multipart/form-data`,
            },
        })
            .then(() => {
                alert('Votre sauce va être publiée !');
                navigate('/');
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })      
            });
    };

    return ( 
        <section className="bg_section sauce_page">
            <div className="sauce_page_picture_container">
                {previewPicture && <img src={previewPicture} alt='' className="sauce_page_content_img" />}
                <label htmlFor="file"></label>
                    <input 
                        type="file" 
                        name="file" 
                        id="file_newpost"
                        accept=".jpg, .jpeg, .png, .gif" 
                        className="trending_container_newpost_file_btn"
                        onChange={changeHandlerPicture}
                    />
                {saucePicture && <img src={saucePicture} alt='' />}
            </div>
        
            <article className="sauce_page_infos">
                <h1 className="sauce_page_infos_header_title bold">Ajouter une nouvelle sauce</h1>
                <form action="" onSubmit={onSubmit} id='update-sauce-infos' className="sauce_form"> 

                    <label htmlFor="name" className="sauce_form_label">Nom :</label>
                        <br />
                        <input 
                            type='text'
                            name="name"
                            id="name"
                            onChange={(e) => setSauceName(e.target.value)}
                            value={sauceName}
                            className='form_input sauce_form_input'
                            required
                        /> 

                    <label htmlFor="manufacturer" className="sauce_form_label">Fabriquant :</label>
                        <br />
                        <input 
                            type='text'
                            name="manufacturer"
                            id="manufacturer"
                            onChange={(e) => setSauceManufacturer(e.target.value)}
                            value={sauceManufacturer}
                            className='form_input sauce_form_input'
                            required
                        /> 
                    
                    <label htmlFor="heat" className="sauce_form_label">Force : <span className="update_sauce_form_label_heat">{sauceHeat} / 5</span></label>
                        <br />
                        <input 
                            type='range'
                            name="heat"
                            id="heat"
                            min='1' max='5'
                            onChange={(e) => setSauceHeat(e.target.value)}
                            value={sauceHeat}
                            className='sauce_form_input_range custom_slider'
                            required
                        />
                    
                    <br />
                    
                    <label htmlFor="description" className="sauce_form_label">Description :</label>
                        <br />
                        <textarea 
                            name="description"
                            id="description"
                            rows='4' cols='100'
                            onChange={(e) => setSauceDescription(e.target.value)}
                            defaultValue={sauceDescription}
                            className='form_input sauce_form_input sauce_form_input_desc'
                            required
                        /> 
                    
                    <label htmlFor='mainPepper' className="sauce_form_label">Piment principal :</label>
                        <br />
                        <input 
                            type='text'
                            name="mainPepper"
                            id="mainPepper"
                            onChange={(e) => setSauceMainPepper(e.target.value)}
                            defaultValue={sauceMainPepper}
                            className='form_input sauce_form_input'
                            required
                        /> 

                    {errorServer && <p className="error center bold">{errorServer.message}</p>}
                    
                    <div className="sauce_form_buttons_container">
                        <button type="submit" className="sauce_form_button sauce_form_button_confirm sauce_form_button_confirm_new">
                            Publier
                        </button>
                    </div>
                
                </form>
            </article>
        </section> 
    )
}

export default AddSauceForm;