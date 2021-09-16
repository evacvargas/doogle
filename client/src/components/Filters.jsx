import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTempers, filterByTempers, filterByBreedCreated, sortByWeight, sortByBreed } from "../actions/index.actions";
import styled from 'styled-components';

const FiltersWraper = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  
  &:focus {
    background-image:
      linear-gradient(45deg, green 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, green 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position:
      calc(100% - 15px) 1em,
      calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size:
      5px 5px,
      5px 5px,
      1px 1.5em;
    background-repeat: no-repeat;
    border-color: green;
    outline: 0;
  }
`;

export default function Filters() {
  const dispatch = useDispatch();
  const allTempersBreeds = useSelector((state) => state.allTempers);


  useEffect(() => {
    dispatch(getAllTempers())
  }, [dispatch])

  useEffect(() => {
    dispatch(filterByTempers())
  }, [dispatch])

  function handleFilterByTemp(e) {
    dispatch(filterByTempers(e.target.value))
  }

  function handleFilterByBreed(e) {
    dispatch(filterByBreedCreated(e.target.value))
  }

  function handleSortByWeight(e) {
    dispatch(sortByWeight(e.target.value))
  }

  function handleSortByBreed(e) {
    e.preventDefault()
    dispatch(sortByBreed(e.target.value))
  }

  return (
    <FiltersWraper>
        <Select onChange={e => handleFilterByTemp(e)}>
          <option value=''> Temper filter </option>
          {allTempersBreeds.map(function (temper) {
            return (
              <option value={temper.name} key={temper.id}> {temper.name} </option>
            );
          })}
        </Select>
      <Select onChange={e => handleFilterByBreed(e)}>
        <option value=''> Breed filter </option>
        <option value='created'> Created </option>
        <option value='existing'> Existing </option>
      </Select>


      <Select onChange={e => handleSortByBreed(e)}>
        <option value=''> Sort by breed </option>
        <option value='asc'> A-Z </option>
        <option value='desc'> Z-A </option>
      </Select>

      <Select onChange={e => handleSortByWeight(e)}>
        <option value=''> Sort by weight </option>
        <option value='asc'> asc </option>
        <option value='desc'> desc </option>
      </Select>
    </FiltersWraper>
  )
}