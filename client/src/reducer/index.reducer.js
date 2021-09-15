import { get_breeds, get_all_tempers, filter_by_tempers, filter_by_breed_created, dogs_by_name, create_dog, get_detail_breed, sort_by_breed, sort_by_weight } from '../actions/actions.types';


const initialState = {
  breeds: [], //estado para guardar el resultado de una accion
  allBreeds: [], //estado para filtrar 
  allTempers: [], //estado para mostrar los temperamentos
  details: []
}

export const reducer = function (state = initialState, action) {

  switch (action.type) {
    case get_breeds:
      return {
        ...state,
        breeds: action.payload,
        allBreeds: action.payload
      }

    case get_all_tempers:
      return {
        ...state,
        allTempers: action.payload
      }

    case filter_by_tempers:
      const filterDogs = state.allBreeds.filter(el => {
        if (el.temperament && el.temperament.includes(action.payload)) {
          return el
        }
      })
      return {
        ...state,
        breeds: filterDogs
      }

    case filter_by_breed_created:
      let filterBreedCreated = []
      if (action.payload === 'created') {
        filterBreedCreated = state.allBreeds.filter(el => {
          if (el.create_in_db === true) {
            return el;
          }
        })
      }
      if (action.payload === 'existing') {
        filterBreedCreated = state.allBreeds.filter(el => {
          if (!el.create_in_db) {
            return el;
          }
        })
      }
      return {
        ...state,
        breeds: filterBreedCreated
      }

    case dogs_by_name:
      return {
        ...state,
        breeds: action.payload
      }

    case create_dog:
      return {
        ...state,
      }

    case get_detail_breed:
      return {
        ...state,
        details: action.payload
      }

    case sort_by_breed:
      let sortedDogsBybreed = action.payload === 'asc' ?
        state.allBreeds.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.allBreeds.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        })

      return {
        ...state,
        breeds: sortedDogsBybreed.slice()
      }

    case sort_by_weight:
      const filterWeight = state.allBreeds.filter(dog => {
        return dog.weight.metric !== false || dog.weight.metric !== 'NaN'
      })
      let sortedDogsByWeight = action.payload === 'asc' ?
        filterWeight.sort(function (a, b) {
          return a.weight.metric?.split(' - ')[0] - b.weight.metric?.split(' - ')[0];
        })
        :
        state.allBreeds.sort(function (a, b) {
          return b.weight.metric?.split(' - ')[1] - a.weight.metric?.split(' - ')[1];
        })

      return {
        ...state,
        breeds: sortedDogsByWeight.slice()
      }

    default:
      return state;

  }
}
export default reducer;

