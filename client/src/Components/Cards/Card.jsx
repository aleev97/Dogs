import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Card.module.css'

const Card = ({ name, weight, image, id, temperament }) => {
   const temps = temperament.join(", "); // unir los temperamentos separados por coma
   
   return (
        <div className={Styles.card} >
            <div>
            <img className={Styles.img} src={image} alt={name}/>
                <div className={Styles.cardDetail} >

                    <Link className={Styles.link} to={`/dogs/detail/${id}`}>
                        <h3 className={Styles.name} >{name}</h3>
                    </Link>

                    <h5 className={Styles.weight} >Weight: {weight?.imperial ? weight.imperial : weight}</h5>
                    <h5 className={Styles.temps} >Temperaments: {temps}</h5>
                </div>
            </div>
        </div>
    );
};

export default Card;
