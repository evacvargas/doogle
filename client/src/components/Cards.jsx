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

const CardsStyles = styled.div`
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
console.log(allBreeds)
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const [pageNumLimit, setPageNumLimit] = useState(8);
  const [maxLimit, setMaxLimit] = useState(20);
  const [minLimit, setMinLimit] = useState(0);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id))
  }
  const pages = [];
  for (let index = 0; index <= Math.ceil(allBreeds?.length / dogsPerPage); index++) {
    pages.push(index);
  };

  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allBreeds?.slice(firstIndex, lastIndex);

  const paging = (pageNum) => {
    setCurrentPage(pageNum)
  };

  const renderPagesNumbers = pages.map((num) => {
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
    <>
      <CardsStyles>
        {currentDogs?.map(function (dog) {
          return (
            <Link to={'/breed/' + dog.id}>
              <Card key={dog.id} dog={dog} />
            </Link>
          );
        })}
      </CardsStyles>
      <Pages>
        {renderPagesNumbers}
      </Pages>
    </>
  )
}