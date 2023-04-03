import { GET_DOGS, ORDER_BY_NAME, GET_TEMPERAMENTS_LIST, GET_DOGS_BY_TEMP, GET_DOGS_BY_NAME, FILTER_CREATED, ORDER_BY_WEIGHT, GET_DETAILS, RESET_DETAIL} from './action-types';

const initialState = {
    dogs: [],
    temperaments: [],
    alldogs: [],
    detail: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS: //reducer para traer info de dogs
            return {
                ...state,
                dogs: action.payload, //mando todo lo que este en el arreglo dogs
                alldogs: action.payload,
            };

        case GET_TEMPERAMENTS_LIST: //reducer para temperamentos
            return {
                ...state,
                temperaments: action.payload,
            };
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload,
            };

        case ORDER_BY_NAME:  //reducer para el filtro de orden asc/desc
            let sortedArr =
                action.payload === "asc"
                    ? state.dogs.sort(function (a, b) { // ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                dogs: sortedArr,
            };

        case ORDER_BY_WEIGHT: //reducer de filtrado por peso min/max
            let sortByWeight =
                action.payload === "max"
                    ? state.dogs.sort(function (a, b) {
                        if (Number(a.weight.split(' ')[0]) > Number(b.weight.split(' ')[0])) {
                            return 1;
                        }
                        if (Number(b.weight.split(' ')[0]) >Number(a.weight.split(' ')[0])) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.dogs.sort(function (a, b) {
                        if (Number(a.weight.split(' ')[0]) > Number(b.weight.split(' ')[0])) {
                            return -1;
                        }
                        if (Number(b.weight.split(' ')[0]) > Number(a.weight.split(' ')[0])) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                dogs: sortByWeight,
            };

        case GET_DOGS_BY_TEMP: //reducer de filtrado por temperamentos
            let dogsWithChosenTemps = action.payload === "all" ? state.alldogs :
                state.alldogs?.filter(dog => {
                    console.log(dog)
                    if (!dog.temperament.length) return [];
                    return dog.temperament.includes(action.payload)
                })
            return {
                ...state,
                dogs: dogsWithChosenTemps,
            }

        case FILTER_CREATED: //reducer para filtrado por perros de api/DB
            const createdFilter = action.payload === 'created' ? state.alldogs.filter(dog => dog.createInDb) : state.alldogs.filter(dog => !dog.createInDb)
            return {
                ...state,
                dogs: createdFilter
            }

        case GET_DETAILS:
            return {
                ...state,
                detail: [action.payload]
            }

            case RESET_DETAIL:
                return {
                  ...state,
                  detail: [],
                };

        default:
            return state;
    }
}