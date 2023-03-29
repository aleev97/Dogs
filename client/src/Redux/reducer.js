import { GET_DOGS, ORDER_BY_NAME, GET_TEMPERAMENTS_LIST, GET_DOGS_BY_TEMP, GET_DOGS_BY_NAME, FILTER_CREATED, ORDER_BY_WEIGHT, GET_DETAILS, RESET_DETAIL} from './action-types';

const initialState = {
    dogs: [],
    temperaments: [],
    alldogs: [],
    detail: [],
}
// IMPORTANTE----->   preguntar sobre los tipos de medidas
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload, //mando todo lo que este en el arreglo dogs
                alldogs: action.payload,
            };

        case GET_TEMPERAMENTS_LIST:
            return {
                ...state,
                temperaments: action.payload,
            };
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload,
            };

        case ORDER_BY_NAME:
            let sortedArr =
                action.payload === "asc"
                    ? state.dogs.sort(function (a, b) {
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

        case ORDER_BY_WEIGHT:
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

        case GET_DOGS_BY_TEMP:
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

        case FILTER_CREATED:
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