import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from "../actions/index.actions";
import styled from "styled-components";
import Card from "./Card";


const Pages = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  text-decoration: none;
  align-items: center;
  color: #4ca771;
  background-color: white;
  padding-left: 0;  
  
  li{
    padding: 10px;
    border: 1px solid #b9c2ba;
    border-radius: 8px;
    cursor: pointer;
    margin: 5px;
  }

`;

const CardWraper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;


export default function Cards() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);

  useEffect(() => {
    dispatch(getBreeds())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const [pageNumLimit, setPageNumLimit] = useState(5);
  const [maxLimit, setMaxLimit] = useState(5);
  const [minLimit, setMinLimit] = useState(0);

  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allBreeds?.slice(firstIndex, lastIndex);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id))
    setPageNumLimit(5)
  }

  const handlerPrevBtn = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumLimit === 0) {
      setMaxLimit(maxLimit - pageNumLimit)
      setMinLimit(minLimit - pageNumLimit)
    }
  }

  const handlerNextBtn = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxLimit) {
      setMaxLimit(maxLimit + pageNumLimit)
      setMinLimit(minLimit + pageNumLimit)
    }
  }

  const pages = [];
  for (let index = 0; index <= Math.ceil(allBreeds?.length / dogsPerPage); index++) {
    pages.push(index);
  };

  const renderPagesNumbers = pages?.map((num) => {
    if (num < maxLimit + 1 && num > minLimit) {
      return (
        <li
          key={num}
          id={num}
          onClick={handleClick}>
          {num}
        </li>
      )
    } else return null;
  });

  return (
    <div>
      <CardWraper>
        {currentDogs?.map(function (dog) {
          return (
            <Card key={dog.id} dog={dog} />
          );
        })}
      </CardWraper>
      <Pages>
        <li> <button onClick={handlerPrevBtn} disabled={currentPage < 2 ? true : false}> Prev </button></li>
        {renderPagesNumbers}
        <li> <button onClick={handlerNextBtn} disabled={currentPage === pages.length - 1 ? true : false}> Next </button> </li>
      </Pages>
    </div>
  )
}