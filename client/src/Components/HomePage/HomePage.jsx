import React from "react";
import Styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/Card";
import { getDogs, getTemperamentsList, orderByName, filterDogsByTemperament, getDogsByName, filterCreated, orderByWeight } from "../../Redux/actions";
import { Paginated } from "../Paginated/Paginated";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs); //traigo lo que esta en estado de dogs(reducer)
    const temperaments = useSelector((state) => state.temperaments).sort( //traigo lo que esta en estado de temperamets(reducer)
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        }
    );

    //states
    const [currentPage, setCurrentPage] = useState(1); // guardo la pagina actual, empiezo en 1
    const [sort, setSort] = useState("");
    const [dogsPerPage, setDogsPerPage] = useState(8);  //seteo 8 personajes por pagina
    const [dogState, setDogsState] = useState("");

    const indexOFLastDog = currentPage * dogsPerPage //8
    const indexOfFirstDog = indexOFLastDog - dogsPerPage //0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOFLastDog) //tomo el indice del primer y ultimo personaje

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    //me traigo del estado los perros, cuando el componente se monta
    useEffect(() => {
        dispatch(getDogs()) //despacho los dogs que traigo de la api
        dispatch(getTemperamentsList()) //despacho los temperaments que traigo de la api
    }, [dispatch])

    
    function form() {
        navigate("/form");
    }

    //boton search
    function handleClick(event) {
        event.preventDefault();
        if (dogState.length === 0) {
            return alert("Please input a name to start the search");

        } else {
            dispatch(getDogsByName(dogState));
            setDogsState("");
        }
    }

    //funcionalidad para filtrar por orden acc/desc
    function handleOrder(event) {
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setSort(`Ordenado ${event.target.value}`);
    }

    //funcionalidad para filtrar por peso
    function handleOrderByWeight(event) {
        event.preventDefault();
        dispatch(orderByWeight(event.target.value));
        setCurrentPage(1);
        setSort(`Ordenado ${event.target.value}`);
    }

    //funcionalidad para filtrar por temperamentos
    function handleFilteredByTemp(event) {
        event.preventDefault();
        dispatch(filterDogsByTemperament(event.target.value));
    }

    //filtrado de busqueda por sector
    function handleFilteredByMade(event) {
        event.preventDefault();
        dispatch(filterCreated(event.target.value));
    }

    return (
        <div className={Styles.container}>
            <h1 className={Styles.title} >Welcome to the home the Dog App 🐾🐾 </h1>
            
            <div>
                <input className={Styles.navbar} type="text" placeholder="Search a dog..." value={dogState} onChange={(event) => setDogsState(event.target.value)} />
                <button className={Styles.button__Search} type="submit" onClick={handleClick}>
                    <span>search 🔎</span>
                </button>
            </div>

            <div>
             <button className={Styles.from__form} onClick={form} >Go to form</button>
                <select className={Styles.order} onChange={(event) => handleOrder(event)}>
                    <option value="asc">ascending</option>
                    <option value="des">descending</option>
                </select>

                <select className={Styles.weight} onChange={(event) => handleOrderByWeight(event)} >
                    <option value="all">all</option>
                    <option value="max">max weight</option>
                    <option value="min">min weight</option>
                </select>

                <select className={Styles.Ordertemperaments} onChange={(event) => handleFilteredByTemp(event)}>
                    <option value="all">All Temperaments</option>
                    {temperaments.map((temp) => {
                        return (
                            <option value={temp} key={temp}>
                                {temp}
                            </option>
                        );
                    })}

                </select>

                <select className={Styles.orderInfo} onChange={(event) => handleFilteredByMade(event)} >
                    <option value="all">All </option>
                    <option value="created">Created </option>
                    <option value="api">Existing</option>
                </select>
                <div className={Styles.card__container} >
                    {currentDogs?.map((dog) => { //tomo los perros que me devuelve el paginado
                        console.log(dog)
                        return (

                            <Card
                                weight={dog.weight}
                                temperament={dog.temperament}
                                name={dog.name}
                                key={dog.id}
                                image={dog.image}
                                id={dog.id}
                            />
                        );

                    })}
                    <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
                </div>
            </div>
        </div>

    )
}      