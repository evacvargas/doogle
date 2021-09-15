import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBreed, getAllTempers } from '../actions/index.actions';
import styled from 'styled-components';
import Nav from './Nav';


const Wraper = styled.div`
  padding: 0 80px 80px 80px;
`;

const GoBack = styled.div`
  cursor: pointer;
  margin-bottom: 50px;
`;

const InputWraper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Input = styled.input`
   border-radius: 20px 0 0 20px; 
   background-color: #F8F9F8;
   border: none;
   padding: 12px 20px;
   color: #575d58;
   font-size: 16px;
   flex: 1;

   &::placeholder {
      color: #575d58;
      font-size: 16px;
   }

   &:focus {
      outline: none;
   }
`;

function validateErrors(input) {
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
    minWeight: '',
    minHeight: '',
    maxWeight: '',
    maxHeight: '',
    life_span: '',
    temperament: [], //UN ARRAY PARA QUE ME DE LA POSIBILIDAD DE GUARDAR MAS DE UN TEMPERAMENTO
  })

  function handleSelect(e) {
    const optionSelected = document.querySelector(`select.temper-select option[value='${e.target.value}']`)
    const optionName = optionSelected.getAttribute('data-name') //sacamos el atributo name para pegarselo al obj name

    setInput({
      ...input,
      temperament: [...input.temperament, { name: optionName, id: e.target.value }]
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      ...input,
      temperament: input.temperament.map(el => el.id)
    }
    dispatch(createBreed(payload))
    alert("Congrats, you have created a dog")
    setInput({
      name: '',
      weight: '',
      height: '',
      minWeight: '',
      minHeight: '',
      maxWeight: '',
      maxHeight: '',
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
    <Wraper>
      <Nav> </Nav>
      <GoBack onClick={() => history.goBack()}> {'<- Dog back'} </GoBack>
      <h1> CREATE YOUR DOG </h1>
      <form onSubmit={handleSubmit}>
        <InputWraper>
          <label> Dog Breed </label>
          <Input
            type='text'
            value={input.name}
            name='name'
            placeholder="name"
            onChange={handleChange}
            require='true'
          />
        </InputWraper>
        <InputWraper>
          <label> Weight Min </label>
          <Input
            type='text'
            value={input.minWeight}
            name='minWeight'
            placeholder="min weight"
            onChange={handleChange}
          />
        </InputWraper>
        <InputWraper>
          <label> Weight Max </label>
          <Input
            type='text'
            value={input.maxWeight}
            name='maxWeight'
            placeholder="max weight"
            onChange={handleChange}
          />
        </InputWraper>
        <InputWraper>
          <label> Height Min </label>
          <Input
            type='text'
            value={input.minHeight}
            name='minHeight'
            placeholder="max height"
            onChange={handleChange}
          />
        </InputWraper>
        <InputWraper>
          <label> Height Max </label>
          <Input
            type='text'
            value={input.maxHeight}
            name='maxHeight'
            placeholder="max height"
            onChange={handleChange}
          />
        </InputWraper>
        <InputWraper>
          <label> Dog Life Span </label>
          <Input
            type='text'
            value={input.life_span}
            name='life_span'
            placeholder="life span"
            onChange={handleChange}
          />
        </InputWraper>
        <InputWraper>
          <label> Add as many tempers possibles </label>
          <select multiple={true} onChange={handleSelect} className="temper-select">
            {tempers.map(function (temper) {
              return (
                <option data-name={temper.name} value={temper.id} key={temper.id}> {temper.name} </option>
              );
            })}
          </select>
          <ul><li> {input.temperament.map(temp => { return temp.name + ', ' })} </li></ul>
        </InputWraper>
        <nav>
          <button type="submit"> Create your Dog </button>
        </nav>
      </form>
    </Wraper>

  )
}