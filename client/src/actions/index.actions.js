import axios from 'axios';
import { get_breeds, get_all_tempers, filter_by_tempers, filter_by_breed_created, get_detail_breed, dogs_by_name, sort_by_weight, sort_by_breed } from './actions.types';

export const getBreeds = function (params) {
  return async function (dispatch) {
    try {
      let result = await axios.get('http://localhost:3002/dogs');
      return dispatch({
        type: get_breeds,
        payload: result.data
      })
    } catch (error) { return error }
  }
};

export const getAllTempers = function (payload) {
  return async function (dispatch) {
    try {
      let result = await axios.get('http://localhost:3002/temperament');
      return dispatch({
        type: get_all_tempers,
        payload: result.data
      })
    } catch (error) { return error }
  }
}

export const filterByTempers = function (payload) {
  return {
    type: filter_by_tempers,
    payload
  }
}

export const filterByBreedCreated = function (payload) {
  return {
    type: filter_by_breed_created,
    payload
  }
}

export const sortByWeight = function (payload) {
  return {
    type: sort_by_weight,
    payload
  }
}

export const sortByBreed = function (payload) {
  return {
    type: sort_by_breed,
    payload
  }
}

export const createBreed = function (payload) {
  return async function (dispatch) {
    payload.weight = payload.minWeight + ' - ' + payload.maxWeight;
    payload.height = payload.minHeight + ' - ' + payload.maxHeight;
    
    try {
      let result = await axios.post('http://localhost:3002/dog', payload)
      return result;
    } catch (error) { return error }
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

export const getDogsByName = function (payload) { //un filtrado mas
  return async function (dispatch) {
    try {
      let result = await axios.get('http://localhost:3002/dogs?name=' + payload);
      return dispatch({
        type: dogs_by_name,
        payload: result.data
      })
    } catch (error) { return error }
  }
}

