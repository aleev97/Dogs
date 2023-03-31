import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperamentsList} from "../../Redux/actions"
import styles from "./Form.module.css"
import Validation from "./Validation"
import axios from "axios";


const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments) //global state
    const [inputs, setInputs] = useState({ //local state
        name: "",
        height: "",
        life_span: "",
        image: "",
        weightMin: "",
        weightMax: "",
        temperaments: [],
    })

    function backToHome() {
        navigate("/home");
    }

    const [error, setErrors] = useState({})

    const handleInputs = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
        setErrors(Validation({
            ...inputs,
            [event.target.name]: event.target.value
        }))
    }

    const handleTemperamentChoices = (event) => {
        setInputs({
            ...inputs,
            temperaments: [...inputs.temperaments, event.target.value]
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
          await axios.post('/dogs', {
            name: inputs.name,
            temperament: inputs.temperaments,
            image: inputs.image,
            weight: inputs.weightMin + ' - ' + inputs.weightMax,
            height: inputs.height,
            life_span: inputs.life_span,
          });
        alert("Dog successfully added")
        setInputs({
            name: "",
            height: "",
            life_span: "",
            image: "",
            weightMin: "0",
            weightMax: "0",
            temperaments: [],
        })
    }

    useEffect(() => {
        dispatch(getTemperamentsList())
    }, [dispatch]);

    return (
        <div className={styles.container1} >
            <div className={styles.contentTitle} >
            <button className={styles.button1} onClick={backToHome} > Back to Home</button>
                <h1 className={styles.title} >Complete the Dog's Form 🐶 </h1>
            </div>
            <form  onSubmit={handleSubmit} className={styles.form} >
               
                <div className={styles.container2} >
                    <label className={styles.name} >Name: </label>
                    <input
                        className={styles.inputName}
                        type="text"
                        name="name"
                        value={inputs.name}
                        placeholder={"Choose a name"}
                        onChange={(event) => handleInputs(event)} />
                    {error.name && <strong className={styles.errName}>{error.name}</strong>}
                </div>

                <div className={styles.container3} >
                    <label className={styles.image} >Image: </label>
                    <input
                        className={styles.inputImage}
                        type="text"
                        name="image"
                        value={inputs.image}
                        placeholder={"Add an image (link)"}
                        onChange={(event) => handleInputs(event)} />
                    {error.image && <strong className={styles.errImag} >{error.image}</strong>}
                </div>

                <div className={styles.container4} >
                    <label className={styles.labelWeight} >Weight</label>
                    <br />
                    <br />
                    <label className={styles.labelWeightmin} >Min: </label>
                    <input
                        className={styles.inputWeightmin}
                        type="text"
                        name="weightMin"
                        value={inputs.weightMin}
                        // min= "1"
                        // max= "100"
                        onChange={(event) => handleInputs(event)} />
                    {error.weightMin && <strong className={styles.errWeightmin}>{error.weightMin}</strong>}

                    <br />

                    <label className={styles.labelWeightmax}>Max: </label>
                    <input
                        className={styles.inputWeightmax}
                        type="text"
                        name="weightMax"
                        value={inputs.weightMax}
                        // min= "1"
                        // max= "100"
                        onChange={(event) => handleInputs(event)} />
                    {error.weightMax && <strong className={styles.errWeightmax}>{error.weightMax}</strong>}
                </div>

                <br />

                <div className={styles.container5} >
                    <label className={styles.height} >Height:</label>
                        <input
                            className={styles.inputHeight}
                            type="text"
                            name="height"
                            value={inputs.height}
                            placeholder={"For example: 55 - 67 (cm)"}
                            onChange={(event) => handleInputs(event)} />
                        {error.height && <strong className={styles.errheight} >{error.height}</strong>}

                </div>

                <br />

                <div className={styles.container6} >
                    <label className={styles.life} >Life expectancy:</label>
                        <input
                            className={styles.inputLife}
                            type="text"
                            name="life_span"
                            value={inputs.life_span}
                            placeholder={"For example: 10 - 15"}
                            onChange={(event) => handleInputs(event)} />
                        {error.life_span && <strong className={styles.errLife} >{error.life_span}</strong>}
                </div>

                <br />

                <label className={styles.temperaments} >Temperaments: </label>
                <select   className={styles.temps} onChange={(event) => handleTemperamentChoices(event)}>
                    <option value="all"></option>
                    {temperaments.map((temp, index) => {
                        return (
                            <option value={temp} key={index}>
                                {temp}
                            </option>
                        );
                    })}
                </select>
                <h5 className={styles.frc} >My dog is...</h5>
                <ul className={styles.ul} ><li>{inputs.temperaments.map(temp => temp + ", ")}</li></ul>
                <button
                    className={styles.button2}
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                    disabled={
                        error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
                    }
                >Add my dog</button>
            </form>
        </div>
    )
}

export default Form;