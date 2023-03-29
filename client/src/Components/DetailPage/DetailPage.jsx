import React, { useState } from "react";
import { getDogs, resetDetail, getDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from './Detail.module.css'

const Detail = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.detail[0])
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Agregamos el estado de carga

  function backToHome() {
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getDetail(id))
      .then(() => {
        setLoading(false); // Si la carga es exitosa, actualizamos el estado de carga
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Si hay un error, actualizamos el estado de carga
      });
    dispatch(getDogs(id))
    return ()=> {dispatch(resetDetail())}
  }, [dispatch, id])

  if (loading) {
    return <div className={styles.load} ><div></div></div>; // Si está cargando, mostramos un mensaje de carga
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={backToHome}>Back to home</button>
      <div className={styles.container2}>
        <img className={styles.img} src={dog?.image} alt={dog?.name}/>
        <div className={styles.dogdetail}>
          <h1 className={styles.name} >Name: {dog?.name}</h1>
          <h2 className={styles.life__span} >time of life: {dog?.life_span} </h2>
          <h2 className={styles.weight} >weight: {dog?.weight?.imperial ? dog?.weight?.imperial : dog?.weight}</h2>
          <h2 className={styles.height} >height: {dog?.height?.imperial ? dog?.height?.imperial : dog?.height}</h2>
          <div className={styles.temps} >  
            <h2>Temperaments:</h2>
            <div>{!dog?.createdInDb ? dog?.temperament.join(', ') : dog?.temperament.map.join(', ')(d => d + " ")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Detail;
