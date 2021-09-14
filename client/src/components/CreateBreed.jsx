import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBreed, getAllTempers } from '../actions/index.actions';
import styled from 'styled-components';


//crear una funcion que valide los parametros que ingresan a traves del input
function validateErrors(input) {
  console.log(input)
  let errors = {};
  if (!input.name) {
    errors.name = 'You need a dog name';
  }
}

export default function CreateBreed() {
  const dispatch = useDispatch()
  const tempers = useSelector((state) => state.allTempers);
  let history = useHistory();

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

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    })

  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createBreed(input))
    alert("Congrats, you have created a dog")
    setInput({
      name: '',
      weight: '',
      height: '',
      life_span: '',
      temperament: [],
    })
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <button onClick={() => history.goBack()}> Dog back </button>
      <h1> CREATE YOUR DOG </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Dog Breed </label>
          <input
            type='text'
            value={input.name}
            name='name'
            placeholder="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Dog Weight </label>
          <input
            type='text'
            value={input.weight}
            name='weight'
            placeholder="weight"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Dog Height </label>
          <input
            type='text'
            value={input.height}
            name='height'
            placeholder="height"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Dog Life Span </label>
          <input
            type='text'
            value={input.life_span}
            name='life_span'
            placeholder="life span"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Add as many tempers possibles </label>
          <select multiple={true} onChange={handleSelect}>
            {tempers.map(function (temper) {
              return (
                <option value={temper.name} key={temper.id}> {temper.name} </option>
              );
            })}
          </select>
          <ul><li> {input.temperament.map(temp => temp + ' ,')} </li></ul>
        </div>
        <button type="submit"> Create your Dog </button>
      </form>
    </div>

  )
}