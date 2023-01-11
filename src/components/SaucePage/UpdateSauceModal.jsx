const UpdateSauceModal = (props) => {
    return(
        <div className="modal_backdrop">
                <section className="modal_container">
                    <h3 className="modal_container_title">Modifier la sauce</h3>
                    <form action="" onSubmit={props.onSubmit} className="modal_container_form">
                    <label htmlFor="name" className="modal_container_label">Nom :</label>
                    <input 
                        type='text'
                        name="name"
                        id="name"
                        onChange={props.changeHandler}
                        defaultValue={props.name}
                        ref={props.nameInputRef}
                        className="modal_container_input"
                    />
                    <label htmlFor="manufacturer" className="modal_container_label">Fabriquant :</label>
                    <input 
                        type='text'
                        name="manufacturer"
                        id="manufacturer"
                        onChange={props.changeHandler}
                        defaultValue={props.manufacturer}
                        ref={props.manufacturerInputRef}
                        className="modal_container_input"
                    /> 

                    <label htmlFor="heat" className="modal_container_label">Force :</label>
                    <span><output id='heat_value'></output> / 5</span>
                    <input 
                        type='range'
                        name="heat"
                        id="heat"
                        min='1' max='5'
                        onChange={props.changeHandler}
                        defaultValue={props.heat}
                        ref={props.heatInputRef}
                        className="modal_container_input"
                    />
            
                    <label htmlFor="description" className="modal_container_label">Description :</label>
                    <input 
                        type='text'
                        name="description"
                        id="description"
                        onChange={props.changeHandler}
                        defaultValue={props.description}
                        ref={props.descriptionInputRef}
                        className="modal_container_input"
                    />
                    <label htmlFor="mainPepper" className="modal_container_label">Piment principal :</label>
                    <input 
                        type='text'
                        name="mainPepper"
                        id="mainPepper"
                        onChange={props.changeHandler}
                        defaultValue={props.mainPepper}
                        ref={props.mainPepperInputRef}
                        className="modal_container_input"
                    /> 
                        <button onClick={props.onCancel} className="modal_container_button modal_container_button_cancel">Annuler</button>
                        <button onClick={props.onConfirm} className="modal_container_button modal_container_button_confirm">Confirmer</button>
                    </form>
                </section>
            </div>
    )
}

export default UpdateSauceModal