import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from "../actions/index.actions";
import styled from "styled-components";
import Card from "./Card";
import { Link } from "react-router-dom";


const Pages = styled.ul`
  list-style: none;
  display: flex;
  
  li{
    padding: 10px;
    border: 1px solid #b9c2ba;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export default function Cards() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  console.log(allBreeds)
  useEffect(() => {
    dispatch(getBreeds())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const [pageNumLimit, setPageNumLimit] = useState(3);
  const [maxLimit, setMaxLimit] = useState(3);
  const [minLimit, setMinLimit] = useState(0);

  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allBreeds?.slice(firstIndex, lastIndex);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id))
    setPageNumLimit(3)
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

  let nextPages = null;
  if (pages.length > minLimit) {
    nextPages = <li onClick={handlerNextBtn}>  &hellip; </li>
  }

  let prevPages = null;
  if (pages.length > maxLimit) {
    prevPages = <li onClick={handlerPrevBtn}>  &hellip; </li>
  }

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
      <StyledLink>
        {currentDogs?.map(function (dog) {
          return (
            <Card key={dog.id} dog={dog} />
          );
        })}
      </StyledLink>
      <Pages>
        <li> <button onClick={handlerPrevBtn}> Prev </button></li>
        {prevPages}
        {renderPagesNumbers}
        {nextPages}
        <li> <button onClick={handlerNextBtn}> Next </button> </li>
      </Pages>
    </div>
  )
}