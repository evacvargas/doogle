import axios from 'axios';
import { get_breeds, get_all_tempers, filter_by_tempers, get_detail_breed, dogs_by_name } from './actions.types';

export const getBreeds = function (params) {
  return async function (dispatch) {
    let result = await axios.get('http://localhost:3002/dogs');

    return dispatch({
      type: get_breeds,
      payload: result.data
    })
  }
};

export const getAllTempers = function (payload) {
  return async function (dispatch) {
    let result = await axios.get('http://localhost:3002/temperament');

    return dispatch({
      type: get_all_tempers,
      payload: result.data
    })
  }
}

export const filterByTempers = function (payload) {
  return {
    type: filter_by_tempers,
    payload
  }
}

//filtrar por raza va aqui

export const createBreed = function (payload) {
  return async function (dispatch) {
    let result = await axios.post('http://localhost:3002/dog', payload)
    return result;
  }
}

export const getDetailBreed = function (id) {
  return async function (dispatch) {
    try {
      let result = await axios.get('http://localhost:3002/dogs/' + id);
      return dispatch({
        type: get_detail_breed,
        payload: result.data
      })
    } catch (error) { return error }
  }
}

export const getDogsByName = function (name) { //un filtrado mas
  return async function (dispatch) {
    try {
      let result = await axios.get('http://localhost:3002/dogs?name=' + name);
      return dispatch({
        type: dogs_by_name,
        name: result.data
      })
    } catch (error) { return error }
  }
}

