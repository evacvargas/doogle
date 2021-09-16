import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBreed, getAllTempers } from '../actions/index.actions';
import styled from 'styled-components';
import Nav from './Nav';

const Wraper = styled.div`
  padding: 0 80px 80px 80px;
`;

const FormWraper = styled.div`
  box-shadow: 2px 2px 20px #dbdbdb;
  border-radius: 20px;
  padding: 25px;
`;

const GoBack = styled.div`
  cursor: pointer;
  margin-bottom: 50px;
`;

const InputWraper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  margin: 0 15px 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  ${InputWraper} {
    width: 50%;
  }
`;

const Input = styled.input`
   border-radius: 20px; 
   background-color: #F8F9F8;
   border: none;
   padding: 12px 20px;
   color: #575d58;
   font-size: 15px;
   flex: 1;

   &::placeholder {
      color: #575d58;
      font-size: 15px;
      font-family: 'Poppins';
   }

   &:focus {
      outline: none;
   }
`;

const Button = styled.button`
  background-color: #4ca771;
  padding: 12px 24px;
  color: white;
  border-radius: 20px;
  font-size: 16px;
  border: none;
  display: inline-block;
`;

export default function CreateBreed() {
  const dispatch = useDispatch()
  const tempers = useSelector((state) => state.allTempers);
  let history = useHistory();
  let [stateButton, setStateButton] = useState(true)


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

  useEffect(() => {
    if (input.name && input.life_span && input.temperament.length && input.minWeight && input.maxWeight && input.maxHeight && input.minHeight) {
      setStateButton(false)
    } else {
      setStateButton(true)
    }
  }, [input])


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
      <Nav />
      <GoBack onClick={() => history.goBack()}> {'<- Dog back'} </GoBack>
      <h1> CREATE YOUR DOG </h1>
      <FormWraper>
        <form onSubmit={handleSubmit}>
          <Row>
            <InputWraper>
              <label> Dog Breed </label>
              <Input
                type='text'
                value={input.name}
                name='name'
                placeholder="Add the name of the dog"
                onChange={handleChange}
                require='true'
              />
            </InputWraper>
            <InputWraper>
              <label> Dog Life Span </label>
              <Input
                type='text'
                value={input.life_span}
                name='life_span'
                placeholder="Add the life span of the dog"
                onChange={handleChange}
              />
            </InputWraper>
          </Row>
          <Row>
            <InputWraper>
              <label> Min Weight </label>
              <Input
                type='text'
                value={input.minWeight}
                name='minWeight'
                placeholder="Add the min weight of the dog"
                onChange={handleChange}
              />
            </InputWraper>
            <InputWraper>
              <label> Max Weight </label>
              <Input
                type='text'
                value={input.maxWeight}
                name='maxWeight'
                placeholder="Add the max weight of the dog"
                onChange={handleChange}
              />
            </InputWraper>
          </Row>
          <Row>
            <InputWraper>
              <label> Min Height </label>
              <Input
                type='text'
                value={input.minHeight}
                name='minHeight'
                placeholder="Add the min height of the dog"
                onChange={handleChange}
              />
            </InputWraper>
            <InputWraper>
              <label> Max Height </label>
              <Input
                type='text'
                value={input.maxHeight}
                name='maxHeight'
                placeholder="Add the max height of the dog"
                onChange={handleChange}
              />
            </InputWraper>
          </Row>
          <InputWraper>
            <label> Add as many tempers as you want </label>
            <select multiple={true} onChange={handleSelect} className="temper-select">
              {tempers.map(function (temper) {
                return (
                  <option data-name={temper.name} value={temper.id} key={temper.id}> {temper.name} </option>
                );
              })}
            </select>
            {input.temperament.length > 0 && (
              <ul><li> {input.temperament.map(temp => { return temp.name + ', ' })} </li></ul>
            )}
          </InputWraper>
          <Button type="submit" disabled={stateButton ? true : false}> Create </Button>
        </form>
      </FormWraper>
    </Wraper>

  )
}