import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createBreed, getAllTempers } from '../actions/index.actions';
import styled from 'styled-components';


//crear una funcion que valide los parametros que ingresan a traves del input
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'You need a dog name';
  }
}

export default function CreateBreed() {
  const dispatch = useDispatch()
  const tempers = useSelector((state) => state.allTempers);

  useEffect(() => {
    dispatch(getAllTempers())
  }, [dispatch])

  const [input, setInput] = useState({
    name: '',
    weight: '',
    height: '',
    life_span: '',
    temperament: [], //UN ARRAY PARA QUE ME DE LA POSIBILIDAD DE GUARDAR MAS DE UN TEMPERAMENTO
  })

  function handleSubmit(e) {

  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <Link to='/home'>
        <button> Dog back </button>
      </Link>
      <h1> CREATE YOUR DOG </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label> Dog Breed </label>
          <input
            type='text'
            value={input.name}
            name='name'
            placeholder="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label> Dog Weight </label>
          <input
            type='text'
            value={input.weight}
            name='weight'
            placeholder="weight"
          />
        </div>
        <div>
          <label> Dog Height </label>
          <input
            type='text'
            value={input.height}
            name='height'
            placeholder="height"
          />
        </div>
        <div>
          <label> Dog Life Span </label>
          <input
            type='text'
            value={input.lifeSpan}
            name='life span'
            placeholder="life span"
          />
        </div>
        <div>
          <label> Add as many tempers possibles </label>
          <select multiple={true}>
            {tempers.map(function (temper) {
              return (
                <option value={temper.name} key={temper.id}> {temper.name} </option>
              );
            })}
          </select>
        </div>
        <button type="submit"> Create your Dog </button>
      </form>
    </div>

  )
}