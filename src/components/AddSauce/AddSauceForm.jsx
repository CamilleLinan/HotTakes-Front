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
            .catch((err) => {
                console.log(err)       
            });
    };

    return ( 
        <section className="sauce_page_figure">
            
        <div className="sauce_page_picture_container">
            {previewPicture && <img src={previewPicture} alt='' className="sauce_page_figure_img" />}
            <label htmlFor="file" className="trending_container_newpost_file_label"></label>
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
        
        <div className="sauce_page_figcaption">
            <section className="form_container">
                <h1 className="sauce_page_header_title bold">Ajouter une nouvelle sauce</h1>
                <form action="" onSubmit={onSubmit} id='update-sauce-infos' className="update_sauce_form"> 

                    
                    <label htmlFor="name" className="update_sauce_form_label bold">Nom :</label>
                        <br />
                        <input 
                            type='text'
                            name="name"
                            id="name"
                            onChange={(e) => setSauceName(e.target.value)}
                            value={sauceName}
                            className='form_input update_sauce_form_input'
                            required
                        /> 

                    <label htmlFor="manufacturer" className="update_sauce_form_label bold">Fabriquant :</label>
                        <br />
                        <input 
                            type='text'
                            name="manufacturer"
                            id="manufacturer"
                            onChange={(e) => setSauceManufacturer(e.target.value)}
                            value={sauceManufacturer}
                            className='form_input update_sauce_form_input'
                            required
                        /> 
                    
                    <label htmlFor="heat" className="update_sauce_form_label bold">Force : <span className="update_sauce_form_label_heat">{sauceHeat} / 5</span></label>
                        <br />
                        <input 
                            type='range'
                            name="heat"
                            id="heat"
                            min='1' max='5'
                            onChange={(e) => setSauceHeat(e.target.value)}
                            value={sauceHeat}
                            className='update_sauce_form_input_range custom_slider'
                            required
                        />
                    
                    <br />
                    <label htmlFor="description" className="update_sauce_form_label bold">Description :</label>
                        <br />
                        <textarea 
                            name="description"
                            id="description"
                            rows='4' cols='100'
                            onChange={(e) => setSauceDescription(e.target.value)}
                            defaultValue={sauceDescription}
                            className='form_input update_sauce_form_input update_sauce_form_input_desc'
                            required
                        /> 
                    
                    <label className="update_sauce_form_label bold">Piment principal :</label>
                        <br />
                        <input 
                            type='text'
                            name="mainPepper"
                            id="mainPepper"
                            onChange={(e) => setSauceMainPepper(e.target.value)}
                            defaultValue={sauceMainPepper}
                            className='form_input update_sauce_form_input'
                            required
                        /> 
                    <div className="update_sauce_form_buttons_container">
                        <button type="submit" className="update_sauce_form_button update_sauce_form_button_confirm update_sauce_form_button_confirm_new">
                            Publier
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </section> 
    )
}

export default AddSauceForm;