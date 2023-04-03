import { GET_DOGS, ORDER_BY_NAME, GET_TEMPERAMENTS_LIST, GET_DOGS_BY_TEMP, GET_DOGS_BY_NAME, FILTER_CREATED, ORDER_BY_WEIGHT, GET_DETAILS, RESET_DETAIL } from './action-types';
import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        let json = await axios.get('/dogs');
        return dispatch({
            type: GET_DOGS, //me traigo la info de dogs(conexion api/client)
            payload: json.data
        })
    }
}

export function getTemperamentsList() {
    return async function (dispatch) {
        var json = await axios.get('/temperaments');
        var listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: GET_TEMPERAMENTS_LIST, //me traigo la info de temperament(conexion api/client)
            payload: listOfTemperaments
        });
    }
}

export function getDogsByName(name) {
    return async function (dispatch) {
        const { data } = await axios.get(`/dogs?name=${name}`);
        return dispatch({
            type: GET_DOGS_BY_NAME, //busqueda por nombre para boton search
            payload: data
        });
    };
}


export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/dogs/${id}`); //busco personaje por id para mostrar detail
           console.log(json.data)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}


export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME, //accion para filtrado de orden ascendente y descendente
        payload
    }
}

export function orderByWeight(payload) {  //accion para filtrado por peso
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function filterCreated(payload) { //payload es el valor de la accion que yo elijo
    return {
        type: FILTER_CREATED, //accion para filtrar personajes de la api o creados desde la DB
        payload
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: GET_DOGS_BY_TEMP, //filtrado por temperamentos
        payload
    }

}


export function resetDetail(payload) {
    return {
        type: RESET_DETAIL,
        payload
    }
}

